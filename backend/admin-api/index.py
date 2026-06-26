import json
import os
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p63746311_apple_glass_site')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
}

def ok(data):
    return {'statusCode': 200, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps(data, ensure_ascii=False)}

def err(msg, code=400):
    return {'statusCode': code, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps({'error': msg})}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def check_auth(headers):
    token = (headers or {}).get('x-admin-token', '')
    return token == os.environ.get('ADMIN_PASSWORD', '')

def handler(event: dict, context) -> dict:
    """Админ API: авторизация, чтение и обновление настроек и видео сайта."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')
    headers = event.get('headers') or {}
    body = {}
    if event.get('body'):
        body = json.loads(event['body'])

    # POST ?action=login — проверка пароля
    if action == 'login':
        password = body.get('password', '')
        if password == os.environ.get('ADMIN_PASSWORD', ''):
            return ok({'success': True, 'token': password})
        return err('Неверный пароль', 401)

    # Все остальные действия требуют авторизации
    if not check_auth(headers):
        return err('Unauthorized', 401)

    conn = get_conn()
    cur = conn.cursor()

    # GET ?action=settings
    if action == 'settings' and method == 'GET':
        cur.execute(f'SELECT key, value FROM {SCHEMA}.site_settings ORDER BY key')
        rows = cur.fetchall()
        conn.close()
        return ok({r[0]: r[1] for r in rows})

    # POST ?action=settings
    if action == 'settings' and method == 'POST':
        for key, value in body.items():
            cur.execute(
                f"INSERT INTO {SCHEMA}.site_settings (key, value, updated_at) VALUES (%s, %s, NOW()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()",
                (key, str(value))
            )
        conn.commit()
        conn.close()
        return ok({'success': True})

    # GET ?action=videos
    if action == 'videos' and method == 'GET':
        cur.execute(f'SELECT id, title, duration, locked, views, video_url, sort_order FROM {SCHEMA}.site_videos ORDER BY sort_order')
        rows = cur.fetchall()
        conn.close()
        return ok([{'id': r[0], 'title': r[1], 'duration': r[2], 'locked': r[3], 'views': r[4], 'video_url': r[5], 'sort_order': r[6]} for r in rows])

    # POST ?action=videos
    if action == 'videos' and method == 'POST':
        cur.execute(
            f"INSERT INTO {SCHEMA}.site_videos (title, duration, locked, views, video_url, sort_order) VALUES (%s, %s, %s, %s, %s, (SELECT COALESCE(MAX(sort_order),0)+1 FROM {SCHEMA}.site_videos)) RETURNING id",
            (body.get('title', 'Новое видео'), body.get('duration', '00:00'), body.get('locked', True), body.get('views', '0'), body.get('video_url', ''))
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return ok({'success': True, 'id': new_id})

    # PUT ?action=videos
    if action == 'videos' and method == 'PUT':
        vid = body.get('id')
        cur.execute(
            f"UPDATE {SCHEMA}.site_videos SET title=%s, duration=%s, locked=%s, views=%s, video_url=%s WHERE id=%s",
            (body.get('title'), body.get('duration'), body.get('locked'), body.get('views'), body.get('video_url', ''), vid)
        )
        conn.commit()
        conn.close()
        return ok({'success': True})

    # DELETE ?action=videos
    if action == 'videos' and method == 'DELETE':
        vid = body.get('id')
        cur.execute(f"DELETE FROM {SCHEMA}.site_videos WHERE id=%s", (vid,))
        conn.commit()
        conn.close()
        return ok({'success': True})

    conn.close()
    return err('Not found', 404)
