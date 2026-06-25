import json
import urllib.request

# Mapping country codes to languages
COUNTRY_TO_LANG = {
    "RU": "ru", "BY": "ru", "KZ": "ru", "UA": "ru", "UZ": "ru", "KG": "ru", "TJ": "ru", "TM": "ru", "AZ": "ru", "AM": "ru", "GE": "ru", "MD": "ru",
    "US": "en", "GB": "en", "AU": "en", "CA": "en", "NZ": "en", "IE": "en", "ZA": "en", "IN": "en", "SG": "en", "NG": "en", "KE": "en", "GH": "en",
    "ES": "es", "MX": "es", "AR": "es", "CO": "es", "CL": "es", "PE": "es", "VE": "es", "EC": "es", "BO": "es", "PY": "es", "UY": "es", "CR": "es", "GT": "es",
    "DE": "de", "AT": "de", "CH": "de", "LU": "de", "LI": "de",
    "FR": "fr", "BE": "fr", "MC": "fr", "SN": "fr", "CI": "fr", "CM": "fr",
    "PT": "pt", "BR": "pt", "AO": "pt", "MZ": "pt",
    "CN": "zh", "TW": "zh", "HK": "zh",
    "JP": "ja",
    "KR": "ko",
    "SA": "ar", "AE": "ar", "EG": "ar", "IQ": "ar", "MA": "ar", "DZ": "ar",
    "TR": "tr",
    "IT": "it", "SM": "it", "VA": "it",
    "PL": "pl",
    "NL": "nl", "SR": "nl",
    "SE": "sv", "NO": "no", "DK": "da", "FI": "fi",
}

def handler(event: dict, context) -> dict:
    """Определяет язык пользователя по его IP-адресу через ip-api.com."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    # Get real IP from headers or query
    ip = None
    headers = event.get('headers', {}) or {}
    for h in ['x-forwarded-for', 'x-real-ip']:
        if h in headers:
            ip = headers[h].split(',')[0].strip()
            break

    if not ip:
        ip = (event.get('requestContext', {}) or {}).get('identity', {}).get('sourceIp')

    query_ip = ip if ip and ip not in ('127.0.0.1', '::1', 'localhost') else ''

    try:
        url = f"http://ip-api.com/json/{query_ip}?fields=countryCode,country"
        with urllib.request.urlopen(url, timeout=3) as resp:
            data = json.loads(resp.read().decode())
        country_code = data.get('countryCode', 'US')
        country_name = data.get('country', '')
    except Exception:
        country_code = 'US'
        country_name = 'Unknown'

    lang = COUNTRY_TO_LANG.get(country_code, 'en')

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'lang': lang,
            'country': country_name,
            'countryCode': country_code
        })
    }
