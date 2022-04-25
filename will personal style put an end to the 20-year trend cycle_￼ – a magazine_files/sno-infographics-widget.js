jQuery(document).ready(function ($) {
    const DEFAULT_COLORS = [
        '#FF6384',
        '#528deb',
        '#4BC0BF',
        '#FFCD56',
        '#FF9F40',
        '#77FF32',
        '#FF3333',
        '#b732db',
        '#db329d',
    ]

    const USA_LABELS = [
        {
            name: 'Alabama',
            abbreviation: 'AL',
        },
        {
            name: 'Alaska',
            abbreviation: 'AK',
        },
        {
            name: 'Arizona',
            abbreviation: 'AZ',
        },
        {
            name: 'Arkansas',
            abbreviation: 'AR',
        },
        {
            name: 'California',
            abbreviation: 'CA',
        },
        {
            name: 'Colorado',
            abbreviation: 'CO',
        },
        {
            name: 'Connecticut',
            abbreviation: 'CT',
        },
        {
            name: 'Delaware',
            abbreviation: 'DE',
        },
        {
            name: 'Florida',
            abbreviation: 'FL',
        },
        {
            name: 'Georgia',
            abbreviation: 'GA',
        },
        {
            name: 'Hawaii',
            abbreviation: 'HI',
        },
        {
            name: 'Idaho',
            abbreviation: 'ID',
        },
        {
            name: 'Illinois',
            abbreviation: 'IL',
        },
        {
            name: 'Indiana',
            abbreviation: 'IN',
        },
        {
            name: 'Iowa',
            abbreviation: 'IA',
        },
        {
            name: 'Kansas',
            abbreviation: 'KS',
        },
        {
            name: 'Kentucky',
            abbreviation: 'KY',
        },
        {
            name: 'Louisiana',
            abbreviation: 'LA',
        },
        {
            name: 'Maine',
            abbreviation: 'ME',
        },
        {
            name: 'Maryland',
            abbreviation: 'MD',
        },
        {
            name: 'Massachusetts',
            abbreviation: 'MA',
        },
        {
            name: 'Michigan',
            abbreviation: 'MI',
        },
        {
            name: 'Minnesota',
            abbreviation: 'MN',
        },
        {
            name: 'Mississippi',
            abbreviation: 'MS',
        },
        {
            name: 'Missouri',
            abbreviation: 'MO',
        },
        {
            name: 'Montana',
            abbreviation: 'MT',
        },
        {
            name: 'Nebraska',
            abbreviation: 'NE',
        },
        {
            name: 'Nevada',
            abbreviation: 'NV',
        },
        {
            name: 'New Hampshire',
            abbreviation: 'NH',
        },
        {
            name: 'New Jersey',
            abbreviation: 'NJ',
        },
        {
            name: 'New Mexico',
            abbreviation: 'NM',
        },
        {
            name: 'New York',
            abbreviation: 'NY',
        },
        {
            name: 'North Carolina',
            abbreviation: 'NC',
        },
        {
            name: 'North Dakota',
            abbreviation: 'ND',
        },
        {
            name: 'Ohio',
            abbreviation: 'OH',
        },
        {
            name: 'Oklahoma',
            abbreviation: 'OK',
        },
        {
            name: 'Oregon',
            abbreviation: 'OR',
        },
        {
            name: 'Pennsylvania',
            abbreviation: 'PA',
        },
        {
            name: 'Rhode Island',
            abbreviation: 'RI',
        },
        {
            name: 'South Carolina',
            abbreviation: 'SC',
        },
        {
            name: 'South Dakota',
            abbreviation: 'SD',
        },
        {
            name: 'Tennessee',
            abbreviation: 'TN',
        },
        {
            name: 'Texas',
            abbreviation: 'TX',
        },
        {
            name: 'Utah',
            abbreviation: 'UT',
        },
        {
            name: 'Vermont',
            abbreviation: 'VT',
        },
        {
            name: 'Virginia',
            abbreviation: 'VA',
        },
        {
            name: 'Washington',
            abbreviation: 'WA',
        },
        {
            name: 'West Virginia',
            abbreviation: 'WV',
        },
        {
            name: 'Wisconsin',
            abbreviation: 'WI',
        },
        {
            name: 'Wyoming',
            abbreviation: 'WY',
        },
    ]

    const COUNTRY_LABELS = [
        {
            name: 'Andorra',
            countryCode: 'AD',
            countryCodeAlpha3: 'AND',
            phone: '376',
            currency: 'EUR',
        },
        {
            name: 'United Arab Emirates',
            countryCode: 'AE',
            countryCodeAlpha3: 'ARE',
            phone: '971',
            currency: 'AED',
        },
        {
            name: 'Afghanistan',
            countryCode: 'AF',
            countryCodeAlpha3: 'AFG',
            phone: '93',
            currency: 'AFN',
        },
        {
            name: 'Antigua and Barbuda',
            countryCode: 'AG',
            countryCodeAlpha3: 'ATG',
            phone: '+1-268',
            currency: 'XCD',
        },
        {
            name: 'Anguilla',
            countryCode: 'AI',
            countryCodeAlpha3: 'AIA',
            phone: '+1-264',
            currency: 'XCD',
        },
        {
            name: 'Albania',
            countryCode: 'AL',
            countryCodeAlpha3: 'ALB',
            phone: '355',
            currency: 'ALL',
        },
        {
            name: 'Armenia',
            countryCode: 'AM',
            countryCodeAlpha3: 'ARM',
            phone: '374',
            currency: 'AMD',
        },
        {
            name: 'Angola',
            countryCode: 'AO',
            countryCodeAlpha3: 'AGO',
            phone: '244',
            currency: 'AOA',
        },
        {
            name: 'Antarctica',
            countryCode: 'AQ',
            countryCodeAlpha3: 'ATA',
            phone: '',
            currency: '',
        },
        {
            name: 'Argentina',
            countryCode: 'AR',
            countryCodeAlpha3: 'ARG',
            phone: '54',
            currency: 'ARS',
        },
        {
            name: 'American Samoa',
            countryCode: 'AS',
            countryCodeAlpha3: 'ASM',
            phone: '+1-684',
            currency: 'USD',
        },
        {
            name: 'Austria',
            countryCode: 'AT',
            countryCodeAlpha3: 'AUT',
            phone: '43',
            currency: 'EUR',
        },
        {
            name: 'Australia',
            countryCode: 'AU',
            countryCodeAlpha3: 'AUS',
            phone: '61',
            currency: 'AUD',
        },
        {
            name: 'Aruba',
            countryCode: 'AW',
            countryCodeAlpha3: 'ABW',
            phone: '297',
            currency: 'AWG',
        },
        {
            name: 'Aland Islands',
            countryCode: 'AX',
            countryCodeAlpha3: 'ALA',
            phone: '+358-18',
            currency: 'EUR',
        },
        {
            name: 'Azerbaijan',
            countryCode: 'AZ',
            countryCodeAlpha3: 'AZE',
            phone: '994',
            currency: 'AZN',
        },
        {
            name: 'Bosnia and Herzegovina',
            countryCode: 'BA',
            countryCodeAlpha3: 'BIH',
            phone: '387',
            currency: 'BAM',
        },
        {
            name: 'Barbados',
            countryCode: 'BB',
            countryCodeAlpha3: 'BRB',
            phone: '+1-246',
            currency: 'BBD',
        },
        {
            name: 'Bangladesh',
            countryCode: 'BD',
            countryCodeAlpha3: 'BGD',
            phone: '880',
            currency: 'BDT',
        },
        {
            name: 'Belgium',
            countryCode: 'BE',
            countryCodeAlpha3: 'BEL',
            phone: '32',
            currency: 'EUR',
        },
        {
            name: 'Burkina Faso',
            countryCode: 'BF',
            countryCodeAlpha3: 'BFA',
            phone: '226',
            currency: 'XOF',
        },
        {
            name: 'Bulgaria',
            countryCode: 'BG',
            countryCodeAlpha3: 'BGR',
            phone: '359',
            currency: 'BGN',
        },
        {
            name: 'Bahrain',
            countryCode: 'BH',
            countryCodeAlpha3: 'BHR',
            phone: '973',
            currency: 'BHD',
        },
        {
            name: 'Burundi',
            countryCode: 'BI',
            countryCodeAlpha3: 'BDI',
            phone: '257',
            currency: 'BIF',
        },
        {
            name: 'Benin',
            countryCode: 'BJ',
            countryCodeAlpha3: 'BEN',
            phone: '229',
            currency: 'XOF',
        },
        {
            name: 'Saint Barthelemy',
            countryCode: 'BL',
            countryCodeAlpha3: 'BLM',
            phone: '590',
            currency: 'EUR',
        },
        {
            name: 'Bermuda',
            countryCode: 'BM',
            countryCodeAlpha3: 'BMU',
            phone: '+1-441',
            currency: 'BMD',
        },
        {
            name: 'Brunei',
            countryCode: 'BN',
            countryCodeAlpha3: 'BRN',
            phone: '673',
            currency: 'BND',
        },
        {
            name: 'Bolivia',
            countryCode: 'BO',
            countryCodeAlpha3: 'BOL',
            phone: '591',
            currency: 'BOB',
        },
        {
            name: 'Bonaire, Saint Eustatius and Saba',
            countryCode: 'BQ',
            countryCodeAlpha3: 'BES',
            phone: '599',
            currency: 'USD',
        },
        {
            name: 'Brazil',
            countryCode: 'BR',
            countryCodeAlpha3: 'BRA',
            phone: '55',
            currency: 'BRL',
        },
        {
            name: 'Bahamas',
            countryCode: 'BS',
            countryCodeAlpha3: 'BHS',
            phone: '+1-242',
            currency: 'BSD',
        },
        {
            name: 'Bhutan',
            countryCode: 'BT',
            countryCodeAlpha3: 'BTN',
            phone: '975',
            currency: 'BTN',
        },
        {
            name: 'Bouvet Island',
            countryCode: 'BV',
            countryCodeAlpha3: 'BVT',
            phone: '',
            currency: 'NOK',
        },
        {
            name: 'Botswana',
            countryCode: 'BW',
            countryCodeAlpha3: 'BWA',
            phone: '267',
            currency: 'BWP',
        },
        {
            name: 'Belarus',
            countryCode: 'BY',
            countryCodeAlpha3: 'BLR',
            phone: '375',
            currency: 'BYR',
        },
        {
            name: 'Belize',
            countryCode: 'BZ',
            countryCodeAlpha3: 'BLZ',
            phone: '501',
            currency: 'BZD',
        },
        {
            name: 'Canada',
            countryCode: 'CA',
            countryCodeAlpha3: 'CAN',
            phone: '1',
            currency: 'CAD',
        },
        {
            name: 'Cocos Islands',
            countryCode: 'CC',
            countryCodeAlpha3: 'CCK',
            phone: '61',
            currency: 'AUD',
        },
        {
            name: 'Democratic Republic of the Congo',
            countryCode: 'CD',
            countryCodeAlpha3: 'COD',
            phone: '243',
            currency: 'CDF',
        },
        {
            name: 'Central African Republic',
            countryCode: 'CF',
            countryCodeAlpha3: 'CAF',
            phone: '236',
            currency: 'XAF',
        },
        {
            name: 'Republic of the Congo',
            countryCode: 'CG',
            countryCodeAlpha3: 'COG',
            phone: '242',
            currency: 'XAF',
        },
        {
            name: 'Switzerland',
            countryCode: 'CH',
            countryCodeAlpha3: 'CHE',
            phone: '41',
            currency: 'CHF',
        },
        {
            name: 'Ivory Coast',
            countryCode: 'CI',
            countryCodeAlpha3: 'CIV',
            phone: '225',
            currency: 'XOF',
        },
        {
            name: 'Cook Islands',
            countryCode: 'CK',
            countryCodeAlpha3: 'COK',
            phone: '682',
            currency: 'NZD',
        },
        {
            name: 'Chile',
            countryCode: 'CL',
            countryCodeAlpha3: 'CHL',
            phone: '56',
            currency: 'CLP',
        },
        {
            name: 'Cameroon',
            countryCode: 'CM',
            countryCodeAlpha3: 'CMR',
            phone: '237',
            currency: 'XAF',
        },
        {
            name: 'China',
            countryCode: 'CN',
            countryCodeAlpha3: 'CHN',
            phone: '86',
            currency: 'CNY',
        },
        {
            name: 'Colombia',
            countryCode: 'CO',
            countryCodeAlpha3: 'COL',
            phone: '57',
            currency: 'COP',
        },
        {
            name: 'Costa Rica',
            countryCode: 'CR',
            countryCodeAlpha3: 'CRI',
            phone: '506',
            currency: 'CRC',
        },
        { name: 'Cuba', countryCode: 'CU', countryCodeAlpha3: 'CUB', phone: '53', currency: 'CUP' },
        {
            name: 'Cape Verde',
            countryCode: 'CV',
            countryCodeAlpha3: 'CPV',
            phone: '238',
            currency: 'CVE',
        },
        {
            name: 'Curacao',
            countryCode: 'CW',
            countryCodeAlpha3: 'CUW',
            phone: '599',
            currency: 'ANG',
        },
        {
            name: 'Christmas Island',
            countryCode: 'CX',
            countryCodeAlpha3: 'CXR',
            phone: '61',
            currency: 'AUD',
        },
        {
            name: 'Cyprus',
            countryCode: 'CY',
            countryCodeAlpha3: 'CYP',
            phone: '357',
            currency: 'EUR',
        },
        {
            name: 'Czech Republic',
            countryCode: 'CZ',
            countryCodeAlpha3: 'CZE',
            phone: '420',
            currency: 'CZK',
        },
        {
            name: 'Germany',
            countryCode: 'DE',
            countryCodeAlpha3: 'DEU',
            phone: '49',
            currency: 'EUR',
        },
        {
            name: 'Djibouti',
            countryCode: 'DJ',
            countryCodeAlpha3: 'DJI',
            phone: '253',
            currency: 'DJF',
        },
        {
            name: 'Denmark',
            countryCode: 'DK',
            countryCodeAlpha3: 'DNK',
            phone: '45',
            currency: 'DKK',
        },
        {
            name: 'Dominica',
            countryCode: 'DM',
            countryCodeAlpha3: 'DMA',
            phone: '+1-767',
            currency: 'XCD',
        },
        {
            name: 'Dominican Republic',
            countryCode: 'DO',
            countryCodeAlpha3: 'DOM',
            phone: '+1-809 and 1-829',
            currency: 'DOP',
        },
        {
            name: 'Algeria',
            countryCode: 'DZ',
            countryCodeAlpha3: 'DZA',
            phone: '213',
            currency: 'DZD',
        },
        {
            name: 'Ecuador',
            countryCode: 'EC',
            countryCodeAlpha3: 'ECU',
            phone: '593',
            currency: 'USD',
        },
        {
            name: 'Estonia',
            countryCode: 'EE',
            countryCodeAlpha3: 'EST',
            phone: '372',
            currency: 'EUR',
        },
        {
            name: 'Egypt',
            countryCode: 'EG',
            countryCodeAlpha3: 'EGY',
            phone: '20',
            currency: 'EGP',
        },
        {
            name: 'Western Sahara',
            countryCode: 'EH',
            countryCodeAlpha3: 'ESH',
            phone: '212',
            currency: 'MAD',
        },
        {
            name: 'Eritrea',
            countryCode: 'ER',
            countryCodeAlpha3: 'ERI',
            phone: '291',
            currency: 'ERN',
        },
        {
            name: 'Spain',
            countryCode: 'ES',
            countryCodeAlpha3: 'ESP',
            phone: '34',
            currency: 'EUR',
        },
        {
            name: 'Ethiopia',
            countryCode: 'ET',
            countryCodeAlpha3: 'ETH',
            phone: '251',
            currency: 'ETB',
        },
        {
            name: 'Finland',
            countryCode: 'FI',
            countryCodeAlpha3: 'FIN',
            phone: '358',
            currency: 'EUR',
        },
        {
            name: 'Fiji',
            countryCode: 'FJ',
            countryCodeAlpha3: 'FJI',
            phone: '679',
            currency: 'FJD',
        },
        {
            name: 'Falkland Islands',
            countryCode: 'FK',
            countryCodeAlpha3: 'FLK',
            phone: '500',
            currency: 'FKP',
        },
        {
            name: 'Micronesia',
            countryCode: 'FM',
            countryCodeAlpha3: 'FSM',
            phone: '691',
            currency: 'USD',
        },
        {
            name: 'Faroe Islands',
            countryCode: 'FO',
            countryCodeAlpha3: 'FRO',
            phone: '298',
            currency: 'DKK',
        },
        {
            name: 'France',
            countryCode: 'FR',
            countryCodeAlpha3: 'FRA',
            phone: '33',
            currency: 'EUR',
        },
        {
            name: 'Gabon',
            countryCode: 'GA',
            countryCodeAlpha3: 'GAB',
            phone: '241',
            currency: 'XAF',
        },
        {
            name: 'United Kingdom',
            countryCode: 'GB',
            countryCodeAlpha3: 'GBR',
            phone: '44',
            currency: 'GBP',
        },
        {
            name: 'Grenada',
            countryCode: 'GD',
            countryCodeAlpha3: 'GRD',
            phone: '+1-473',
            currency: 'XCD',
        },
        {
            name: 'Georgia',
            countryCode: 'GE',
            countryCodeAlpha3: 'GEO',
            phone: '995',
            currency: 'GEL',
        },
        {
            name: 'French Guiana',
            countryCode: 'GF',
            countryCodeAlpha3: 'GUF',
            phone: '594',
            currency: 'EUR',
        },
        {
            name: 'Guernsey',
            countryCode: 'GG',
            countryCodeAlpha3: 'GGY',
            phone: '+44-1481',
            currency: 'GBP',
        },
        {
            name: 'Ghana',
            countryCode: 'GH',
            countryCodeAlpha3: 'GHA',
            phone: '233',
            currency: 'GHS',
        },
        {
            name: 'Gibraltar',
            countryCode: 'GI',
            countryCodeAlpha3: 'GIB',
            phone: '350',
            currency: 'GIP',
        },
        {
            name: 'Greenland',
            countryCode: 'GL',
            countryCodeAlpha3: 'GRL',
            phone: '299',
            currency: 'DKK',
        },
        {
            name: 'Gambia',
            countryCode: 'GM',
            countryCodeAlpha3: 'GMB',
            phone: '220',
            currency: 'GMD',
        },
        {
            name: 'Guinea',
            countryCode: 'GN',
            countryCodeAlpha3: 'GIN',
            phone: '224',
            currency: 'GNF',
        },
        {
            name: 'Guadeloupe',
            countryCode: 'GP',
            countryCodeAlpha3: 'GLP',
            phone: '590',
            currency: 'EUR',
        },
        {
            name: 'Equatorial Guinea',
            countryCode: 'GQ',
            countryCodeAlpha3: 'GNQ',
            phone: '240',
            currency: 'XAF',
        },
        {
            name: 'Greece',
            countryCode: 'GR',
            countryCodeAlpha3: 'GRC',
            phone: '30',
            currency: 'EUR',
        },
        {
            name: 'South Georgia and the South Sandwich Islands',
            countryCode: 'GS',
            countryCodeAlpha3: 'SGS',
            phone: '',
            currency: 'GBP',
        },
        {
            name: 'Guatemala',
            countryCode: 'GT',
            countryCodeAlpha3: 'GTM',
            phone: '502',
            currency: 'GTQ',
        },
        {
            name: 'Guam',
            countryCode: 'GU',
            countryCodeAlpha3: 'GUM',
            phone: '+1-671',
            currency: 'USD',
        },
        {
            name: 'Guinea-Bissau',
            countryCode: 'GW',
            countryCodeAlpha3: 'GNB',
            phone: '245',
            currency: 'XOF',
        },
        {
            name: 'Guyana',
            countryCode: 'GY',
            countryCodeAlpha3: 'GUY',
            phone: '592',
            currency: 'GYD',
        },
        {
            name: 'Hong Kong',
            countryCode: 'HK',
            countryCodeAlpha3: 'HKG',
            phone: '852',
            currency: 'HKD',
        },
        {
            name: 'Heard Island and McDonald Islands',
            countryCode: 'HM',
            countryCodeAlpha3: 'HMD',
            phone: '',
            currency: 'AUD',
        },
        {
            name: 'Honduras',
            countryCode: 'HN',
            countryCodeAlpha3: 'HND',
            phone: '504',
            currency: 'HNL',
        },
        {
            name: 'Croatia',
            countryCode: 'HR',
            countryCodeAlpha3: 'HRV',
            phone: '385',
            currency: 'HRK',
        },
        {
            name: 'Haiti',
            countryCode: 'HT',
            countryCodeAlpha3: 'HTI',
            phone: '509',
            currency: 'HTG',
        },
        {
            name: 'Hungary',
            countryCode: 'HU',
            countryCodeAlpha3: 'HUN',
            phone: '36',
            currency: 'HUF',
        },
        {
            name: 'Indonesia',
            countryCode: 'ID',
            countryCodeAlpha3: 'IDN',
            phone: '62',
            currency: 'IDR',
        },
        {
            name: 'Ireland',
            countryCode: 'IE',
            countryCodeAlpha3: 'IRL',
            phone: '353',
            currency: 'EUR',
        },
        {
            name: 'Israel',
            countryCode: 'IL',
            countryCodeAlpha3: 'ISR',
            phone: '972',
            currency: 'ILS',
        },
        {
            name: 'Isle of Man',
            countryCode: 'IM',
            countryCodeAlpha3: 'IMN',
            phone: '+44-1624',
            currency: 'GBP',
        },
        {
            name: 'India',
            countryCode: 'IN',
            countryCodeAlpha3: 'IND',
            phone: '91',
            currency: 'INR',
        },
        {
            name: 'British Indian Ocean Territory',
            countryCode: 'IO',
            countryCodeAlpha3: 'IOT',
            phone: '246',
            currency: 'USD',
        },
        {
            name: 'Iraq',
            countryCode: 'IQ',
            countryCodeAlpha3: 'IRQ',
            phone: '964',
            currency: 'IQD',
        },
        { name: 'Iran', countryCode: 'IR', countryCodeAlpha3: 'IRN', phone: '98', currency: 'IRR' },
        {
            name: 'Iceland',
            countryCode: 'IS',
            countryCodeAlpha3: 'ISL',
            phone: '354',
            currency: 'ISK',
        },
        {
            name: 'Italy',
            countryCode: 'IT',
            countryCodeAlpha3: 'ITA',
            phone: '39',
            currency: 'EUR',
        },
        {
            name: 'Jersey',
            countryCode: 'JE',
            countryCodeAlpha3: 'JEY',
            phone: '+44-1534',
            currency: 'GBP',
        },
        {
            name: 'Jamaica',
            countryCode: 'JM',
            countryCodeAlpha3: 'JAM',
            phone: '+1-876',
            currency: 'JMD',
        },
        {
            name: 'Jordan',
            countryCode: 'JO',
            countryCodeAlpha3: 'JOR',
            phone: '962',
            currency: 'JOD',
        },
        {
            name: 'Japan',
            countryCode: 'JP',
            countryCodeAlpha3: 'JPN',
            phone: '81',
            currency: 'JPY',
        },
        {
            name: 'Kenya',
            countryCode: 'KE',
            countryCodeAlpha3: 'KEN',
            phone: '254',
            currency: 'KES',
        },
        {
            name: 'Kyrgyzstan',
            countryCode: 'KG',
            countryCodeAlpha3: 'KGZ',
            phone: '996',
            currency: 'KGS',
        },
        {
            name: 'Cambodia',
            countryCode: 'KH',
            countryCodeAlpha3: 'KHM',
            phone: '855',
            currency: 'KHR',
        },
        {
            name: 'Kiribati',
            countryCode: 'KI',
            countryCodeAlpha3: 'KIR',
            phone: '686',
            currency: 'AUD',
        },
        {
            name: 'Comoros',
            countryCode: 'KM',
            countryCodeAlpha3: 'COM',
            phone: '269',
            currency: 'KMF',
        },
        {
            name: 'Saint Kitts and Nevis',
            countryCode: 'KN',
            countryCodeAlpha3: 'KNA',
            phone: '+1-869',
            currency: 'XCD',
        },
        {
            name: 'North Korea',
            countryCode: 'KP',
            countryCodeAlpha3: 'PRK',
            phone: '850',
            currency: 'KPW',
        },
        {
            name: 'South Korea',
            countryCode: 'KR',
            countryCodeAlpha3: 'KOR',
            phone: '82',
            currency: 'KRW',
        },
        { name: 'Kosovo', countryCode: 'XK', countryCodeAlpha3: 'XKX', phone: '', currency: 'EUR' },
        {
            name: 'Kuwait',
            countryCode: 'KW',
            countryCodeAlpha3: 'KWT',
            phone: '965',
            currency: 'KWD',
        },
        {
            name: 'Cayman Islands',
            countryCode: 'KY',
            countryCodeAlpha3: 'CYM',
            phone: '+1-345',
            currency: 'KYD',
        },
        {
            name: 'Kazakhstan',
            countryCode: 'KZ',
            countryCodeAlpha3: 'KAZ',
            phone: '7',
            currency: 'KZT',
        },
        {
            name: 'Laos',
            countryCode: 'LA',
            countryCodeAlpha3: 'LAO',
            phone: '856',
            currency: 'LAK',
        },
        {
            name: 'Lebanon',
            countryCode: 'LB',
            countryCodeAlpha3: 'LBN',
            phone: '961',
            currency: 'LBP',
        },
        {
            name: 'Saint Lucia',
            countryCode: 'LC',
            countryCodeAlpha3: 'LCA',
            phone: '+1-758',
            currency: 'XCD',
        },
        {
            name: 'Liechtenstein',
            countryCode: 'LI',
            countryCodeAlpha3: 'LIE',
            phone: '423',
            currency: 'CHF',
        },
        {
            name: 'Sri Lanka',
            countryCode: 'LK',
            countryCodeAlpha3: 'LKA',
            phone: '94',
            currency: 'LKR',
        },
        {
            name: 'Liberia',
            countryCode: 'LR',
            countryCodeAlpha3: 'LBR',
            phone: '231',
            currency: 'LRD',
        },
        {
            name: 'Lesotho',
            countryCode: 'LS',
            countryCodeAlpha3: 'LSO',
            phone: '266',
            currency: 'LSL',
        },
        {
            name: 'Lithuania',
            countryCode: 'LT',
            countryCodeAlpha3: 'LTU',
            phone: '370',
            currency: 'LTL',
        },
        {
            name: 'Luxembourg',
            countryCode: 'LU',
            countryCodeAlpha3: 'LUX',
            phone: '352',
            currency: 'EUR',
        },
        {
            name: 'Latvia',
            countryCode: 'LV',
            countryCodeAlpha3: 'LVA',
            phone: '371',
            currency: 'LVL',
        },
        {
            name: 'Libya',
            countryCode: 'LY',
            countryCodeAlpha3: 'LBY',
            phone: '218',
            currency: 'LYD',
        },
        {
            name: 'Morocco',
            countryCode: 'MA',
            countryCodeAlpha3: 'MAR',
            phone: '212',
            currency: 'MAD',
        },
        {
            name: 'Monaco',
            countryCode: 'MC',
            countryCodeAlpha3: 'MCO',
            phone: '377',
            currency: 'EUR',
        },
        {
            name: 'Moldova',
            countryCode: 'MD',
            countryCodeAlpha3: 'MDA',
            phone: '373',
            currency: 'MDL',
        },
        {
            name: 'Montenegro',
            countryCode: 'ME',
            countryCodeAlpha3: 'MNE',
            phone: '382',
            currency: 'EUR',
        },
        {
            name: 'Saint Martin',
            countryCode: 'MF',
            countryCodeAlpha3: 'MAF',
            phone: '590',
            currency: 'EUR',
        },
        {
            name: 'Madagascar',
            countryCode: 'MG',
            countryCodeAlpha3: 'MDG',
            phone: '261',
            currency: 'MGA',
        },
        {
            name: 'Marshall Islands',
            countryCode: 'MH',
            countryCodeAlpha3: 'MHL',
            phone: '692',
            currency: 'USD',
        },
        {
            name: 'Macedonia',
            countryCode: 'MK',
            countryCodeAlpha3: 'MKD',
            phone: '389',
            currency: 'MKD',
        },
        {
            name: 'Mali',
            countryCode: 'ML',
            countryCodeAlpha3: 'MLI',
            phone: '223',
            currency: 'XOF',
        },
        {
            name: 'Myanmar',
            countryCode: 'MM',
            countryCodeAlpha3: 'MMR',
            phone: '95',
            currency: 'MMK',
        },
        {
            name: 'Mongolia',
            countryCode: 'MN',
            countryCodeAlpha3: 'MNG',
            phone: '976',
            currency: 'MNT',
        },
        {
            name: 'Macao',
            countryCode: 'MO',
            countryCodeAlpha3: 'MAC',
            phone: '853',
            currency: 'MOP',
        },
        {
            name: 'Northern Mariana Islands',
            countryCode: 'MP',
            countryCodeAlpha3: 'MNP',
            phone: '+1-670',
            currency: 'USD',
        },
        {
            name: 'Martinique',
            countryCode: 'MQ',
            countryCodeAlpha3: 'MTQ',
            phone: '596',
            currency: 'EUR',
        },
        {
            name: 'Mauritania',
            countryCode: 'MR',
            countryCodeAlpha3: 'MRT',
            phone: '222',
            currency: 'MRO',
        },
        {
            name: 'Montserrat',
            countryCode: 'MS',
            countryCodeAlpha3: 'MSR',
            phone: '+1-664',
            currency: 'XCD',
        },
        {
            name: 'Malta',
            countryCode: 'MT',
            countryCodeAlpha3: 'MLT',
            phone: '356',
            currency: 'EUR',
        },
        {
            name: 'Mauritius',
            countryCode: 'MU',
            countryCodeAlpha3: 'MUS',
            phone: '230',
            currency: 'MUR',
        },
        {
            name: 'Maldives',
            countryCode: 'MV',
            countryCodeAlpha3: 'MDV',
            phone: '960',
            currency: 'MVR',
        },
        {
            name: 'Malawi',
            countryCode: 'MW',
            countryCodeAlpha3: 'MWI',
            phone: '265',
            currency: 'MWK',
        },
        {
            name: 'Mexico',
            countryCode: 'MX',
            countryCodeAlpha3: 'MEX',
            phone: '52',
            currency: 'MXN',
        },
        {
            name: 'Malaysia',
            countryCode: 'MY',
            countryCodeAlpha3: 'MYS',
            phone: '60',
            currency: 'MYR',
        },
        {
            name: 'Mozambique',
            countryCode: 'MZ',
            countryCodeAlpha3: 'MOZ',
            phone: '258',
            currency: 'MZN',
        },
        {
            name: 'Namibia',
            countryCode: 'NA',
            countryCodeAlpha3: 'NAM',
            phone: '264',
            currency: 'NAD',
        },
        {
            name: 'New Caledonia',
            countryCode: 'NC',
            countryCodeAlpha3: 'NCL',
            phone: '687',
            currency: 'XPF',
        },
        {
            name: 'Niger',
            countryCode: 'NE',
            countryCodeAlpha3: 'NER',
            phone: '227',
            currency: 'XOF',
        },
        {
            name: 'Norfolk Island',
            countryCode: 'NF',
            countryCodeAlpha3: 'NFK',
            phone: '672',
            currency: 'AUD',
        },
        {
            name: 'Nigeria',
            countryCode: 'NG',
            countryCodeAlpha3: 'NGA',
            phone: '234',
            currency: 'NGN',
        },
        {
            name: 'Nicaragua',
            countryCode: 'NI',
            countryCodeAlpha3: 'NIC',
            phone: '505',
            currency: 'NIO',
        },
        {
            name: 'Netherlands',
            countryCode: 'NL',
            countryCodeAlpha3: 'NLD',
            phone: '31',
            currency: 'EUR',
        },
        {
            name: 'Norway',
            countryCode: 'NO',
            countryCodeAlpha3: 'NOR',
            phone: '47',
            currency: 'NOK',
        },
        {
            name: 'Nepal',
            countryCode: 'NP',
            countryCodeAlpha3: 'NPL',
            phone: '977',
            currency: 'NPR',
        },
        {
            name: 'Nauru',
            countryCode: 'NR',
            countryCodeAlpha3: 'NRU',
            phone: '674',
            currency: 'AUD',
        },
        {
            name: 'Niue',
            countryCode: 'NU',
            countryCodeAlpha3: 'NIU',
            phone: '683',
            currency: 'NZD',
        },
        {
            name: 'New Zealand',
            countryCode: 'NZ',
            countryCodeAlpha3: 'NZL',
            phone: '64',
            currency: 'NZD',
        },
        {
            name: 'Oman',
            countryCode: 'OM',
            countryCodeAlpha3: 'OMN',
            phone: '968',
            currency: 'OMR',
        },
        {
            name: 'Panama',
            countryCode: 'PA',
            countryCodeAlpha3: 'PAN',
            phone: '507',
            currency: 'PAB',
        },
        { name: 'Peru', countryCode: 'PE', countryCodeAlpha3: 'PER', phone: '51', currency: 'PEN' },
        {
            name: 'French Polynesia',
            countryCode: 'PF',
            countryCodeAlpha3: 'PYF',
            phone: '689',
            currency: 'XPF',
        },
        {
            name: 'Papua New Guinea',
            countryCode: 'PG',
            countryCodeAlpha3: 'PNG',
            phone: '675',
            currency: 'PGK',
        },
        {
            name: 'Philippines',
            countryCode: 'PH',
            countryCodeAlpha3: 'PHL',
            phone: '63',
            currency: 'PHP',
        },
        {
            name: 'Pakistan',
            countryCode: 'PK',
            countryCodeAlpha3: 'PAK',
            phone: '92',
            currency: 'PKR',
        },
        {
            name: 'Poland',
            countryCode: 'PL',
            countryCodeAlpha3: 'POL',
            phone: '48',
            currency: 'PLN',
        },
        {
            name: 'Saint Pierre and Miquelon',
            countryCode: 'PM',
            countryCodeAlpha3: 'SPM',
            phone: '508',
            currency: 'EUR',
        },
        {
            name: 'Pitcairn',
            countryCode: 'PN',
            countryCodeAlpha3: 'PCN',
            phone: '870',
            currency: 'NZD',
        },
        {
            name: 'Puerto Rico',
            countryCode: 'PR',
            countryCodeAlpha3: 'PRI',
            phone: '+1-787 and 1-939',
            currency: 'USD',
        },
        {
            name: 'Palestinian Territory',
            countryCode: 'PS',
            countryCodeAlpha3: 'PSE',
            phone: '970',
            currency: 'ILS',
        },
        {
            name: 'Portugal',
            countryCode: 'PT',
            countryCodeAlpha3: 'PRT',
            phone: '351',
            currency: 'EUR',
        },
        {
            name: 'Palau',
            countryCode: 'PW',
            countryCodeAlpha3: 'PLW',
            phone: '680',
            currency: 'USD',
        },
        {
            name: 'Paraguay',
            countryCode: 'PY',
            countryCodeAlpha3: 'PRY',
            phone: '595',
            currency: 'PYG',
        },
        {
            name: 'Qatar',
            countryCode: 'QA',
            countryCodeAlpha3: 'QAT',
            phone: '974',
            currency: 'QAR',
        },
        {
            name: 'Reunion',
            countryCode: 'RE',
            countryCodeAlpha3: 'REU',
            phone: '262',
            currency: 'EUR',
        },
        {
            name: 'Romania',
            countryCode: 'RO',
            countryCodeAlpha3: 'ROU',
            phone: '40',
            currency: 'RON',
        },
        {
            name: 'Serbia',
            countryCode: 'RS',
            countryCodeAlpha3: 'SRB',
            phone: '381',
            currency: 'RSD',
        },
        {
            name: 'Russia',
            countryCode: 'RU',
            countryCodeAlpha3: 'RUS',
            phone: '7',
            currency: 'RUB',
        },
        {
            name: 'Rwanda',
            countryCode: 'RW',
            countryCodeAlpha3: 'RWA',
            phone: '250',
            currency: 'RWF',
        },
        {
            name: 'Saudi Arabia',
            countryCode: 'SA',
            countryCodeAlpha3: 'SAU',
            phone: '966',
            currency: 'SAR',
        },
        {
            name: 'Solomon Islands',
            countryCode: 'SB',
            countryCodeAlpha3: 'SLB',
            phone: '677',
            currency: 'SBD',
        },
        {
            name: 'Seychelles',
            countryCode: 'SC',
            countryCodeAlpha3: 'SYC',
            phone: '248',
            currency: 'SCR',
        },
        {
            name: 'Sudan',
            countryCode: 'SD',
            countryCodeAlpha3: 'SDN',
            phone: '249',
            currency: 'SDG',
        },
        {
            name: 'South Sudan',
            countryCode: 'SS',
            countryCodeAlpha3: 'SSD',
            phone: '211',
            currency: 'SSP',
        },
        {
            name: 'Sweden',
            countryCode: 'SE',
            countryCodeAlpha3: 'SWE',
            phone: '46',
            currency: 'SEK',
        },
        {
            name: 'Singapore',
            countryCode: 'SG',
            countryCodeAlpha3: 'SGP',
            phone: '65',
            currency: 'SGD',
        },
        {
            name: 'Saint Helena',
            countryCode: 'SH',
            countryCodeAlpha3: 'SHN',
            phone: '290',
            currency: 'SHP',
        },
        {
            name: 'Slovenia',
            countryCode: 'SI',
            countryCodeAlpha3: 'SVN',
            phone: '386',
            currency: 'EUR',
        },
        {
            name: 'Svalbard and Jan Mayen',
            countryCode: 'SJ',
            countryCodeAlpha3: 'SJM',
            phone: '47',
            currency: 'NOK',
        },
        {
            name: 'Slovakia',
            countryCode: 'SK',
            countryCodeAlpha3: 'SVK',
            phone: '421',
            currency: 'EUR',
        },
        {
            name: 'Sierra Leone',
            countryCode: 'SL',
            countryCodeAlpha3: 'SLE',
            phone: '232',
            currency: 'SLL',
        },
        {
            name: 'San Marino',
            countryCode: 'SM',
            countryCodeAlpha3: 'SMR',
            phone: '378',
            currency: 'EUR',
        },
        {
            name: 'Senegal',
            countryCode: 'SN',
            countryCodeAlpha3: 'SEN',
            phone: '221',
            currency: 'XOF',
        },
        {
            name: 'Somalia',
            countryCode: 'SO',
            countryCodeAlpha3: 'SOM',
            phone: '252',
            currency: 'SOS',
        },
        {
            name: 'Suriname',
            countryCode: 'SR',
            countryCodeAlpha3: 'SUR',
            phone: '597',
            currency: 'SRD',
        },
        {
            name: 'Sao Tome and Principe',
            countryCode: 'ST',
            countryCodeAlpha3: 'STP',
            phone: '239',
            currency: 'STD',
        },
        {
            name: 'El Salvador',
            countryCode: 'SV',
            countryCodeAlpha3: 'SLV',
            phone: '503',
            currency: 'USD',
        },
        {
            name: 'Sint Maarten',
            countryCode: 'SX',
            countryCodeAlpha3: 'SXM',
            phone: '599',
            currency: 'ANG',
        },
        {
            name: 'Syria',
            countryCode: 'SY',
            countryCodeAlpha3: 'SYR',
            phone: '963',
            currency: 'SYP',
        },
        {
            name: 'Swaziland',
            countryCode: 'SZ',
            countryCodeAlpha3: 'SWZ',
            phone: '268',
            currency: 'SZL',
        },
        {
            name: 'Turks and Caicos Islands',
            countryCode: 'TC',
            countryCodeAlpha3: 'TCA',
            phone: '+1-649',
            currency: 'USD',
        },
        {
            name: 'Chad',
            countryCode: 'TD',
            countryCodeAlpha3: 'TCD',
            phone: '235',
            currency: 'XAF',
        },
        {
            name: 'French Southern Territories',
            countryCode: 'TF',
            countryCodeAlpha3: 'ATF',
            phone: '',
            currency: 'EUR',
        },
        {
            name: 'Togo',
            countryCode: 'TG',
            countryCodeAlpha3: 'TGO',
            phone: '228',
            currency: 'XOF',
        },
        {
            name: 'Thailand',
            countryCode: 'TH',
            countryCodeAlpha3: 'THA',
            phone: '66',
            currency: 'THB',
        },
        {
            name: 'Tajikistan',
            countryCode: 'TJ',
            countryCodeAlpha3: 'TJK',
            phone: '992',
            currency: 'TJS',
        },
        {
            name: 'Tokelau',
            countryCode: 'TK',
            countryCodeAlpha3: 'TKL',
            phone: '690',
            currency: 'NZD',
        },
        {
            name: 'East Timor',
            countryCode: 'TL',
            countryCodeAlpha3: 'TLS',
            phone: '670',
            currency: 'USD',
        },
        {
            name: 'Turkmenistan',
            countryCode: 'TM',
            countryCodeAlpha3: 'TKM',
            phone: '993',
            currency: 'TMT',
        },
        {
            name: 'Tunisia',
            countryCode: 'TN',
            countryCodeAlpha3: 'TUN',
            phone: '216',
            currency: 'TND',
        },
        {
            name: 'Tonga',
            countryCode: 'TO',
            countryCodeAlpha3: 'TON',
            phone: '676',
            currency: 'TOP',
        },
        {
            name: 'Turkey',
            countryCode: 'TR',
            countryCodeAlpha3: 'TUR',
            phone: '90',
            currency: 'TRY',
        },
        {
            name: 'Trinidad and Tobago',
            countryCode: 'TT',
            countryCodeAlpha3: 'TTO',
            phone: '+1-868',
            currency: 'TTD',
        },
        {
            name: 'Tuvalu',
            countryCode: 'TV',
            countryCodeAlpha3: 'TUV',
            phone: '688',
            currency: 'AUD',
        },
        {
            name: 'Taiwan',
            countryCode: 'TW',
            countryCodeAlpha3: 'TWN',
            phone: '886',
            currency: 'TWD',
        },
        {
            name: 'Tanzania',
            countryCode: 'TZ',
            countryCodeAlpha3: 'TZA',
            phone: '255',
            currency: 'TZS',
        },
        {
            name: 'Ukraine',
            countryCode: 'UA',
            countryCodeAlpha3: 'UKR',
            phone: '380',
            currency: 'UAH',
        },
        {
            name: 'Uganda',
            countryCode: 'UG',
            countryCodeAlpha3: 'UGA',
            phone: '256',
            currency: 'UGX',
        },
        {
            name: 'United States Minor Outlying Islands',
            countryCode: 'UM',
            countryCodeAlpha3: 'UMI',
            phone: '1',
            currency: 'USD',
        },
        {
            name: 'United States',
            countryCode: 'US',
            countryCodeAlpha3: 'USA',
            phone: '1',
            currency: 'USD',
        },
        {
            name: 'Uruguay',
            countryCode: 'UY',
            countryCodeAlpha3: 'URY',
            phone: '598',
            currency: 'UYU',
        },
        {
            name: 'Uzbekistan',
            countryCode: 'UZ',
            countryCodeAlpha3: 'UZB',
            phone: '998',
            currency: 'UZS',
        },
        {
            name: 'Vatican',
            countryCode: 'VA',
            countryCodeAlpha3: 'VAT',
            phone: '379',
            currency: 'EUR',
        },
        {
            name: 'Saint Vincent and the Grenadines',
            countryCode: 'VC',
            countryCodeAlpha3: 'VCT',
            phone: '+1-784',
            currency: 'XCD',
        },
        {
            name: 'Venezuela',
            countryCode: 'VE',
            countryCodeAlpha3: 'VEN',
            phone: '58',
            currency: 'VEF',
        },
        {
            name: 'British Virgin Islands',
            countryCode: 'VG',
            countryCodeAlpha3: 'VGB',
            phone: '+1-284',
            currency: 'USD',
        },
        {
            name: 'U.S. Virgin Islands',
            countryCode: 'VI',
            countryCodeAlpha3: 'VIR',
            phone: '+1-340',
            currency: 'USD',
        },
        {
            name: 'Vietnam',
            countryCode: 'VN',
            countryCodeAlpha3: 'VNM',
            phone: '84',
            currency: 'VND',
        },
        {
            name: 'Vanuatu',
            countryCode: 'VU',
            countryCodeAlpha3: 'VUT',
            phone: '678',
            currency: 'VUV',
        },
        {
            name: 'Wallis and Futuna',
            countryCode: 'WF',
            countryCodeAlpha3: 'WLF',
            phone: '681',
            currency: 'XPF',
        },
        {
            name: 'Samoa',
            countryCode: 'WS',
            countryCodeAlpha3: 'WSM',
            phone: '685',
            currency: 'WST',
        },
        {
            name: 'Yemen',
            countryCode: 'YE',
            countryCodeAlpha3: 'YEM',
            phone: '967',
            currency: 'YER',
        },
        {
            name: 'Mayotte',
            countryCode: 'YT',
            countryCodeAlpha3: 'MYT',
            phone: '262',
            currency: 'EUR',
        },
        {
            name: 'South Africa',
            countryCode: 'ZA',
            countryCodeAlpha3: 'ZAF',
            phone: '27',
            currency: 'ZAR',
        },
        {
            name: 'Zambia',
            countryCode: 'ZM',
            countryCodeAlpha3: 'ZMB',
            phone: '260',
            currency: 'ZMK',
        },
        {
            name: 'Zimbabwe',
            countryCode: 'ZW',
            countryCodeAlpha3: 'ZWE',
            phone: '263',
            currency: 'ZWL',
        },
        {
            name: 'Serbia and Montenegro',
            countryCode: 'CS',
            countryCodeAlpha3: 'SCG',
            phone: '381',
            currency: 'RSD',
        },
        {
            name: 'Netherlands Antilles',
            countryCode: 'AN',
            countryCodeAlpha3: 'ANT',
            phone: '599',
            currency: 'ANG',
        },
    ]

    $('.infographic-widget-container').each(function (index, el) {
        let canvasChart = null

        let activeChart = null
        let DEFAULT_OPTIONS = {}
        let DATASETS = []
        let LABELS = []
        let COLOR_KEYS = []

        let canvasCtx = null
        let canvasMap = null
        let chartContainer

        const chartId = Number($(this).attr('data-chart-id'))

        const mapContainerId = `map-container-${index}`

        if (chartId) {
            initializeSettings()
        }

        function initializeSettings() {
            chartContainer = $(`#infographics-widget-container-${chartId}`)

            const savedChartType = chartContainer.attr('data-chart-type')
            const savedChartLabels = chartContainer.attr('data-chart-labels')
            const savedChartDatasets = chartContainer.attr('data-chart-datasets')
            const savedChartOptions = chartContainer.attr('data-chart-options')
            const savedColorKeys = chartContainer.attr('data-chart-color-keys')

            canvasCtx = $(`#infographicWidgetChart-${chartId}`)

            if (savedChartLabels && savedChartLabels !== 'null') {
                LABELS = JSON.parse(savedChartLabels)
            }
            if (savedChartDatasets && savedChartDatasets !== 'null') {
                const temp = savedChartDatasets.replace(/u0027/g, "'")
                DATASETS = JSON.parse(temp)
            }
            if (savedChartOptions && savedChartOptions !== 'null') {
                const temp = savedChartOptions.replace(/u0027/g, "'")
                DEFAULT_OPTIONS = JSON.parse(temp)
            }
            if (savedColorKeys && savedColorKeys !== 'null' && savedColorKeys !== []) {
                COLOR_KEYS = JSON.parse(savedColorKeys)
            }
            if (savedChartType && savedChartType !== 'null') {
                activeChart = savedChartType
            }

            if (DEFAULT_OPTIONS.canvasBackground) {
                let style = chartContainer.attr('style')
                style += `; background-color: ${DEFAULT_OPTIONS.canvasBackground} !important`

                console.log('style', style)

                chartContainer.attr('style', style)
            }

            if (activeChart && DATASETS.length) {
                renderChart()
            } else {
                console.log('error: not all data supplied')
            }
        }

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result
                ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16),
                  }
                : null
        }

        function renderMapLegend() {
            if (DEFAULT_OPTIONS.m_colorMapping !== 'Gradient') {
                canvasMap.legend()

                const legendContainer = $(`
            <div class="legendContainer-noGradient">
                <p class="legendTitle" style="color: ${DEFAULT_OPTIONS.legendTitleColor}">${
                    DEFAULT_OPTIONS.legendTitleVisible ? DEFAULT_OPTIONS.legendTitle : ''
                }</p>
                <p class="legendSubtitle" style="color: ${DEFAULT_OPTIONS.legendSubtitleColor}">${
                    DEFAULT_OPTIONS.legendSubtitleVisible ? DEFAULT_OPTIONS.legendSubtitle : ''
                }</p>
            </div>`)

                $(`#${mapContainerId}`).append(legendContainer)
                return
            }
            const mapContainer = $(`#${mapContainerId}`)

            mapContainer.addClass('relativePositioning')

            const legendContainer = $(`
        <div class="legendContainer">
            <p class="legendTitle" style="color: ${DEFAULT_OPTIONS.legendTitleColor}">${
                DEFAULT_OPTIONS.legendTitleVisible ? DEFAULT_OPTIONS.legendTitle : ''
            }</p>
            <p class="legendSubtitle" style="color: ${DEFAULT_OPTIONS.legendSubtitleColor}">${
                DEFAULT_OPTIONS.legendSubtitleVisible ? DEFAULT_OPTIONS.legendSubtitle : ''
            }</p>
            <div class="gradientLegend"></div>
            <div class="gradientLabels"></div>
        </div>`)
            // build legend

            const gradientPreview = legendContainer.find('.gradientLegend')

            const domainRange = DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data.reduce(
                function (curr, dataObj) {
                    if (Number(dataObj.value)) {
                        if (dataObj.value < curr[0]) {
                            curr[0] = dataObj.value
                        }
                        if (dataObj.value > curr[1]) {
                            curr[1] = dataObj.value
                        }
                    }
                    return curr
                },
                [100000000, 0]
            )

            if (DEFAULT_OPTIONS.m_rangeType === 'range') {
                const gradientPreviewWidth = 275
                const sectionWidth = Math.floor(
                    gradientPreviewWidth / DEFAULT_OPTIONS.m_gradientRangeAmount
                )

                gradientPreview.addClass('range-section-rows')

                if (DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors.length > 1) {
                    const gradientColorsArr = chroma
                        .scale(DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors)
                        .mode('lch')
                        .colors(DEFAULT_OPTIONS.m_gradientRangeAmount)

                    for (let j = 0; j < DEFAULT_OPTIONS.m_gradientRangeAmount; j++) {
                        const rangeSection = $(`
                    <div class="range-section"></div>
                `)

                        rangeSection.css('width', sectionWidth)
                        rangeSection.css('background', gradientColorsArr[j])

                        gradientPreview.append(rangeSection)
                    }
                }

                // generate range numbers
                legendContainer.find('.gradientLabels').addClass('spacingEven')

                const rangeDiff = domainRange[1] - domainRange[0]
                const rangeSplit = Math.floor(rangeDiff / DEFAULT_OPTIONS.m_gradientRangeAmount)

                let prevRangeNumber = domainRange[0] + rangeSplit
                for (let i = 0; i < DEFAULT_OPTIONS.m_gradientRangeAmount; i++) {
                    if (i == 0) {
                        // const rangeText = $(`<p class="legendRangeText"></p>`)
                        // legendContainer.find('.gradientLabels').append(rangeText)
                    } else {
                        const rangeText = $(`<p class="legendRangeText">${prevRangeNumber}</p>`)
                        legendContainer.find('.gradientLabels').append(rangeText)

                        const nextRangeNumber = prevRangeNumber + rangeSplit
                        prevRangeNumber = nextRangeNumber + 1
                    }
                }
            } else {
                gradientPreview.removeClass('range-section-rows')

                let gradientString = 'linear-gradient(90deg,'

                if (DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors[0]) {
                    gradientString += ` ${
                        DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors[0]
                    } 0%,`
                }
                if (DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors[1]) {
                    if (DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors[2]) {
                        gradientString += ` ${
                            DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors[1]
                        } 50%, ${
                            DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors[2]
                        } 100%)`
                    } else {
                        gradientString += ` ${
                            DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors[1]
                        } 100%)`
                    }
                } else {
                    gradientString += ` ${
                        DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors[0]
                    } 100%)`
                }

                gradientPreview.css('background', gradientString)

                // generate range amounts
                const startRange = $(`<p class="legendRangeText">${domainRange[0]}</p>`)
                const endRange = $(`<p class="legendRangeText">${domainRange[1]}</p>`)

                legendContainer.find('.gradientLabels').append(startRange)
                legendContainer.find('.gradientLabels').append(endRange)
            }

            mapContainer.append(legendContainer)
        }

        function renderMapTitle() {
            const titleContainer = $(`
                <div class="mapTitleContainer">
                    <p class="titleText" style="color: ${
                        DEFAULT_OPTIONS.chartTitleColor
                    }; font-size: ${DEFAULT_OPTIONS.chartTitleFontSize}px;">${
                DEFAULT_OPTIONS.chartTitle ? DEFAULT_OPTIONS.chartTitle : ''
            }</p>
                </div>`)
            if (DEFAULT_OPTIONS.chartSubtitleVisible) {
                titleContainer.append(
                    `<p class="subtitleText" style="color: ${
                        DEFAULT_OPTIONS.chartSubtitleColor
                    }; font-size: ${DEFAULT_OPTIONS.chartSubtitleFontSize}px;">${
                        DEFAULT_OPTIONS.chartSubtitle ? DEFAULT_OPTIONS.chartSubtitle : ''
                    }</p>`
                )
            }

            $(`#${mapContainerId}`).append(titleContainer)
        }

        function renderMap() {
            chartContainer
                .empty()
                .append(
                    `<div id=${mapContainerId} style="position: relative; width: 100%; height: 100%; margin-bottom: 80px;"></div>`
                )
            // .append(`<div id="map-container-index" style="position: relative; width: 100%;"></div>`)

            const dataConfigObj = {}
            const customColorFills = {}

            if (DEFAULT_OPTIONS.m_colorMapping == 'Gradient') {
                const gradientColors =
                    DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].gradientColors

                const domainRange = DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data.reduce(
                    function (curr, dataObj) {
                        if (Number(dataObj.value)) {
                            if (dataObj.value < curr[0]) {
                                curr[0] = dataObj.value
                            }
                            if (dataObj.value > curr[1]) {
                                curr[1] = dataObj.value
                            }
                        }
                        return curr
                    },
                    [100000000, 0]
                )

                if (DEFAULT_OPTIONS.m_rangeType === 'range') {
                    const cScaleClasses = chroma
                        .scale(gradientColors)
                        .mode('lch')
                        .domain(domainRange)
                        .classes(Number(DEFAULT_OPTIONS.m_gradientRangeAmount))

                    if (DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data.length) {
                        for (
                            let i = 0;
                            i < DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data.length;
                            i++
                        ) {
                            if (DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data[i]) {
                                const dataValObj =
                                    DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data[i]

                                if (Number(dataValObj.value)) {
                                    if (activeChart === 'usa') {
                                        dataConfigObj[
                                            USA_LABELS[dataValObj.index - 1].abbreviation
                                        ] = {
                                            fill: cScaleClasses(dataValObj.value).hex(),
                                            fillColor: cScaleClasses(dataValObj.value).hex(),
                                        }
                                    } else {
                                        if (!dataValObj.country) {
                                            continue
                                        }
                                        const countryObj = COUNTRY_LABELS.find(
                                            (labelObj) => labelObj.name === dataValObj.country
                                        )
                                        if (countryObj) {
                                            dataConfigObj[countryObj.countryCodeAlpha3] = {
                                                fill: cScaleClasses(dataValObj.value).hex(),
                                                fillColor: cScaleClasses(dataValObj.value).hex(),
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    const cScale = chroma.scale(gradientColors).domain(domainRange)

                    if (DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data.length) {
                        for (
                            let i = 0;
                            i < DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data.length;
                            i++
                        ) {
                            if (DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data[i]) {
                                const dataValObj =
                                    DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data[i]

                                if (Number(dataValObj.value)) {
                                    if (activeChart === 'usa') {
                                        dataConfigObj[
                                            USA_LABELS[dataValObj.index - 1].abbreviation
                                        ] = {
                                            fill: cScale(dataValObj.value).hex(),
                                            fillColor: cScale(dataValObj.value).hex(),
                                        }
                                    } else {
                                        if (!dataValObj.country) {
                                            continue
                                        }
                                        const countryObj = COUNTRY_LABELS.find(
                                            (labelObj) => labelObj.name === dataValObj.country
                                        )
                                        if (countryObj) {
                                            dataConfigObj[countryObj.countryCodeAlpha3] = {
                                                fill: cScale(dataValObj.value).hex(),
                                                fillColor: cScale(dataValObj.value).hex(),
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // else if (DEFAULT_OPTIONS.m_colorMapping == 'Manual') {
            //     if (
            //         DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex] &&
            //         DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].colorMappings.length
            //     ) {
            //         for (let colorMapObj of DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex]
            //             .colorMappings) {
            //             const foundShortName = USA_LABELS.find(function (labelObj) {
            //                 return labelObj.name === colorMapObj.name
            //             })

            //             if (foundShortName) {
            //                 dataConfigObj[foundShortName.abbreviation] = {
            //                     fillKey: colorMapObj.color,
            //                 }
            //             }
            //         }
            //     }

            //     for (let colorKeyObj of COLOR_KEYS) {
            //         if (colorKeyObj.label && colorKeyObj.color) {
            //             customColorFills[colorKeyObj.label] = colorKeyObj.color
            //         }
            //     }
            // }
            else if (DEFAULT_OPTIONS.m_colorMapping == 'Labels') {
                if (DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data.length) {
                    for (
                        let i = 0;
                        i < DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data.length;
                        i++
                    ) {
                        if (DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data[i]) {
                            const dataValObj =
                                DATASETS[DEFAULT_OPTIONS.m_mappingDatasetIndex].data[i]

                            if (activeChart === 'usa') {
                                dataConfigObj[USA_LABELS[dataValObj.index - 1].abbreviation] = {
                                    fillKey: dataValObj.value,
                                }
                            } else {
                                if (!dataValObj.country) {
                                    console.log('no country selected', dataValObj)
                                } else {
                                    const countryObj = COUNTRY_LABELS.find(
                                        (labelObj) => labelObj.name === dataValObj.country
                                    )
                                    if (countryObj) {
                                        dataConfigObj[countryObj.countryCodeAlpha3] = {
                                            fillKey: dataValObj.value,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for (let colorKeyObj of COLOR_KEYS) {
                    if (colorKeyObj.label && colorKeyObj.color) {
                        customColorFills[colorKeyObj.label] = colorKeyObj.color
                    }
                }
            }

            function generateTooltipTemplate(geography, data) {
                if (!DEFAULT_OPTIONS.m_popupOnHover || !data) return
                //this function should just return a string
                const hoverStyle = `background-color: ${DEFAULT_OPTIONS.m_hoverBackgroundColor};border: ${DEFAULT_OPTIONS.m_hoverBorderWidth}px solid ${DEFAULT_OPTIONS.m_hoverBorderColor};padding: ${DEFAULT_OPTIONS.m_hoverPadding}px; border-radius: ${DEFAULT_OPTIONS.m_hoverBorderRadius}px;`

                let tooltipContainer

                if (DEFAULT_OPTIONS.m_tooltipTemplate === 'rows') {
                    tooltipContainer = $(`
                <div class="tooltip-container" style="${hoverStyle}">
                    <strong>${geography.properties.name}</strong>
                    <div class="tooltip-elements-container tooltip-container-rows">
                    </div>
                </div>
                `)
                } else {
                    tooltipContainer = $(`
                <div class="tooltip-container" style="${hoverStyle}">
                    <strong>${geography.properties.name}</strong>
                    <div class="tooltip-elements-container tooltip-container-columns"></div>
                </div>
                `)
                }

                for (let i = 0; i < DEFAULT_OPTIONS.m_tooltipElements; i++) {
                    const tooltipElContainer = $(`
                    <div class="${
                        DEFAULT_OPTIONS.m_tooltipTemplate === 'rows'
                            ? 'tooltip-content-row'
                            : 'tooltip-content-col'
                    }">
                        <p class="tooltip-el-label">${
                            DEFAULT_OPTIONS.m_tooltipDatasets[i].label
                                ? DEFAULT_OPTIONS.m_tooltipDatasets[i].label
                                : '[No Label]'
                        }</p>
                        <div class="${
                            DEFAULT_OPTIONS.m_tooltipTemplate === 'rows'
                                ? 'tooltip-el-data-container'
                                : 'tooltip-el-data-container-cols'
                        }">
                            <p class="tooltip-el-data">${data.data || ''}</p>
                        </div>
                    </div>`)

                    tooltipContainer.find('.tooltip-elements-container').append(tooltipElContainer)
                }

                return tooltipContainer.prop('outerHTML')
            }

            //tooltips
            if (activeChart === 'usa') {
                //add data to config
                for (let tooltipDataset of DEFAULT_OPTIONS.m_tooltipDatasets) {
                    if (tooltipDataset.datasetLabel) {
                        const foundDataset = DATASETS.find(function (d) {
                            return tooltipDataset.datasetLabel == d.label
                        })

                        if (foundDataset && foundDataset.data.length) {
                            for (let i = 0; i < foundDataset.data.length; i++) {
                                if (foundDataset.data[i]) {
                                    const dataValObj = foundDataset.data[i]

                                    if (dataValObj.value) {
                                        dataConfigObj[
                                            USA_LABELS[dataValObj.index - 1].abbreviation
                                        ] = {
                                            ...dataConfigObj[
                                                USA_LABELS[dataValObj.index - 1].abbreviation
                                            ],
                                            data: dataValObj.value,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                //add data to config
                for (let tooltipDataset of DEFAULT_OPTIONS.m_tooltipDatasets) {
                    if (tooltipDataset.datasetLabel) {
                        const foundDataset = DATASETS.find(function (d) {
                            return tooltipDataset.datasetLabel == d.label
                        })

                        if (foundDataset && foundDataset.data.length) {
                            for (let i = 0; i < foundDataset.data.length; i++) {
                                if (foundDataset.data[i]) {
                                    const dataValObj = foundDataset.data[i]

                                    if (dataValObj.value) {
                                        if (!dataValObj.country) continue
                                        const countryObj = COUNTRY_LABELS.find(
                                            (labelObj) => labelObj.name === dataValObj.country
                                        )
                                        if (countryObj) {
                                            dataConfigObj[countryObj.countryCodeAlpha3] = {
                                                ...dataConfigObj[countryObj.countryCodeAlpha3],
                                                data: dataValObj.value,
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            const config = {
                element: document.getElementById(mapContainerId),
                scope: activeChart,
                height: null, // If not null, datamaps will grab the height of 'element'
                width: null,
                responsive: true,
                aspectRatio: activeChart === 'world' ? 0.8 : 0.6,
                projection: activeChart === 'world' ? 'mercator' : 'equirectangular',
                fills: {
                    ...customColorFills,
                    defaultFill: DEFAULT_OPTIONS.m_defaultFill,
                },
                data: dataConfigObj,
                geographyConfig: {
                    dataUrl: null, // If not null, datamaps will fetch the map JSON (currently only supports topojson)
                    hideAntarctica: true,
                    hideHawaiiAndAlaska: false,
                    borderWidth: DEFAULT_OPTIONS.m_borderWidth,
                    borderOpacity: DEFAULT_OPTIONS.m_borderOpacity,
                    borderColor: DEFAULT_OPTIONS.m_borderColor,
                    popupTemplate: generateTooltipTemplate,
                    popupOnHover: DEFAULT_OPTIONS.m_popupOnHover,
                    highlightOnHover: DEFAULT_OPTIONS.m_highlightOnHover,
                    highlightFillColor: function (geo) {
                        if (geo['fillColor']) {
                            return chroma(geo['fillColor']).alpha(0.7).hex()
                        } else if (geo['fillKey']) {
                            return chroma(customColorFills[geo['fillKey']]).alpha(0.7).hex()
                        } else {
                            return chroma(DEFAULT_OPTIONS.m_defaultFill).alpha(0.7).hex()
                        }
                    },
                    highlightBorderColor: DEFAULT_OPTIONS.m_highlightHoverBorderColor,
                    highlightBorderOpacity: 1,
                },
            }

            canvasMap = new Datamap(config)

            if (DEFAULT_OPTIONS.m_stateLabels) {
                canvasMap.labels({ labelColor: DEFAULT_OPTIONS.m_stateLabelTextColor })
            }

            if (DEFAULT_OPTIONS.m_colorMapping == 'Gradient') {
                if (!$.isEmptyObject(dataConfigObj)) {
                    const mappedColorsObj = {}
                    Object.keys(dataConfigObj).map(function (dataObjKey) {
                        mappedColorsObj[dataObjKey] = dataConfigObj[dataObjKey].fill
                    })
                    const mappedDataObj = {}
                    Object.keys(dataConfigObj).map(function (dataObjKey) {
                        mappedDataObj[dataObjKey] = {
                            ...dataConfigObj[dataObjKey],
                            fillColor: dataConfigObj[dataObjKey].fill,
                        }
                    })
                }
            }

            if (DEFAULT_OPTIONS.legendEnabled) {
                renderMapLegend()
            }

            if (DEFAULT_OPTIONS.chartTitleVisible) {
                renderMapTitle()
            }
        }

        function renderChart() {
            if (canvasChart) canvasChart.destroy()

            if (activeChart === 'usa' || activeChart === 'world') {
                renderMap()
                return
            }
            // else {
            //     chartContainer.empty().append(
            //         `<div style="width: 100%;">
            //                 <canvas id="infographicChart" width="100%" height="100%"></canvas>
            //             </div>`
            //     )
            // }

            const localDatasets = DATASETS.map(function (dataset) {
                if (!dataset.data.length && dataset.defaultData && dataset.defaultData.length) {
                    return {
                        ...dataset,
                        data: dataset.defaultData,
                    }
                } else {
                    return dataset
                }
            })

            if (activeChart !== 'pie' && activeChart !== 'donut') {
                localDatasets.map(function (dataset) {
                    if (dataset.barOpacity !== 1 && dataset.backgroundColor) {
                        const rgbColor = hexToRgb(dataset.borderColor)
                        dataset.backgroundColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${dataset.barOpacity})`
                    }
                    return dataset
                })
            }

            const globalConfigOptions = {
                plugins: {
                    title: {
                        color: DEFAULT_OPTIONS.chartTitleColor,
                        position: DEFAULT_OPTIONS.chartTitlePosition,
                        align: DEFAULT_OPTIONS.chartTitleAlignment,
                    },
                    subtitle: {
                        display: DEFAULT_OPTIONS.chartSubtitleVisible,
                        color: DEFAULT_OPTIONS.chartSubtitleColor,
                        text: DEFAULT_OPTIONS.chartSubtitle,
                        font: {
                            size: DEFAULT_OPTIONS.chartSubtitleFontSize,
                        },
                    },
                    legend: {
                        title: {
                            display: DEFAULT_OPTIONS.legendTitleVisible,
                            text: DEFAULT_OPTIONS.legendTitle,
                            color: DEFAULT_OPTIONS.legendTitleColor,
                        },
                    },
                },
                layout: {
                    padding: DEFAULT_OPTIONS.chartPadding,
                },
                animations: !DEFAULT_OPTIONS.animations
                    ? false
                    : {
                          tension: {
                              duration: 1000,
                              easing: 'linear',
                              from: 1,
                              to: 0,
                              loop: DEFAULT_OPTIONS.animationsLoop,
                          },
                      },
                transitions: {
                    active: {
                        animation: {
                            duration: DEFAULT_OPTIONS.animationsOnLoad ? 400 : 0,
                        },
                    },
                },
            }

            if (activeChart === 'line') {
                const data = {
                    labels: LABELS,
                    datasets: localDatasets,
                }
                const config = {
                    type: 'line',
                    data,
                    options: {
                        ...globalConfigOptions,
                        indexAxis: DEFAULT_OPTIONS.indexAxisX ? 'x' : 'y',
                        plugins: {
                            legend: {
                                display: DEFAULT_OPTIONS.legendEnabled,
                                position: DEFAULT_OPTIONS.legendPosition,
                                labels: {
                                    font: {
                                        size: DEFAULT_OPTIONS.legendLabelsFontSize,
                                    },
                                },
                            },
                            tooltip: {
                                enabled: DEFAULT_OPTIONS.tooltipsEnabled,
                            },
                            title: {
                                display: DEFAULT_OPTIONS.chartTitleVisible,
                                text: DEFAULT_OPTIONS.chartTitle,
                                font: {
                                    size: DEFAULT_OPTIONS.chartTitleFontSize,
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: DEFAULT_OPTIONS.xTitleVisible,
                                    align: DEFAULT_OPTIONS.xTitleAlign,
                                    text: DEFAULT_OPTIONS.xTitle,
                                    font: {
                                        size: DEFAULT_OPTIONS.xTitleFontSize,
                                    },
                                },
                                grid: {
                                    display: DEFAULT_OPTIONS.xGridLines,
                                    drawBorder: DEFAULT_OPTIONS.xBorder,
                                    color: DEFAULT_OPTIONS.xGridLinesColor,
                                },
                                ticks: {
                                    display: DEFAULT_OPTIONS.xTicks,
                                },
                            },
                            y: {
                                beginAtZero: DEFAULT_OPTIONS.startAtZero,
                                title: {
                                    display: DEFAULT_OPTIONS.yTitleVisible,
                                    align: DEFAULT_OPTIONS.yTitleAlign,
                                    text: DEFAULT_OPTIONS.yTitle,
                                    font: {
                                        size: DEFAULT_OPTIONS.yTitleFontSize,
                                    },
                                },
                                grid: {
                                    display: DEFAULT_OPTIONS.yGridLines,
                                    drawBorder: DEFAULT_OPTIONS.yBorder,
                                    color: DEFAULT_OPTIONS.yGridLinesColor,
                                },
                                ticks: {
                                    display: DEFAULT_OPTIONS.yTicks,
                                },
                            },
                        },
                    },
                }
                canvasChart = new Chart(canvasCtx, config)
            } else if (activeChart === 'bar') {
                const data = {
                    labels: LABELS,
                    datasets: localDatasets,
                }
                const config = {
                    type: 'bar',
                    data,
                    options: {
                        ...globalConfigOptions,
                        plugins: {
                            legend: {
                                display: DEFAULT_OPTIONS.legendEnabled,
                                position: DEFAULT_OPTIONS.legendPosition,
                                labels: {
                                    font: {
                                        size: DEFAULT_OPTIONS.legendLabelsFontSize,
                                    },
                                },
                            },
                            tooltip: {
                                enabled: DEFAULT_OPTIONS.tooltipsEnabled,
                            },
                            title: {
                                display: DEFAULT_OPTIONS.chartTitleVisible,
                                text: DEFAULT_OPTIONS.chartTitle,
                                font: {
                                    size: DEFAULT_OPTIONS.chartTitleFontSize,
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: DEFAULT_OPTIONS.xTitleVisible,
                                    align: DEFAULT_OPTIONS.xTitleAlign,
                                    text: DEFAULT_OPTIONS.xTitle,
                                    font: {
                                        size: DEFAULT_OPTIONS.xTitleFontSize,
                                    },
                                },
                                grid: {
                                    display: DEFAULT_OPTIONS.xGridLines,
                                    drawBorder: DEFAULT_OPTIONS.xBorder,
                                    color: DEFAULT_OPTIONS.xGridLinesColor,
                                },
                                ticks: {
                                    display: DEFAULT_OPTIONS.xTicks,
                                },
                            },
                            y: {
                                beginAtZero: DEFAULT_OPTIONS.startAtZero,
                                title: {
                                    display: DEFAULT_OPTIONS.yTitleVisible,
                                    align: DEFAULT_OPTIONS.yTitleAlign,
                                    text: DEFAULT_OPTIONS.yTitle,
                                    font: {
                                        size: DEFAULT_OPTIONS.yTitleFontSize,
                                    },
                                },
                                grid: {
                                    display: DEFAULT_OPTIONS.yGridLines,
                                    drawBorder: DEFAULT_OPTIONS.yBorder,
                                    color: DEFAULT_OPTIONS.yGridLinesColor,
                                },
                                ticks: {
                                    display: DEFAULT_OPTIONS.yTicks,
                                },
                            },
                        },
                    },
                }
                canvasChart = new Chart(canvasCtx, config)
            } else if (activeChart === 'radar') {
                const data = {
                    labels: LABELS,
                    datasets: localDatasets,
                }
                const config = {
                    type: 'radar',
                    data,
                    options: {
                        ...globalConfigOptions,
                        plugins: {
                            legend: {
                                display: DEFAULT_OPTIONS.legendEnabled,
                                position: DEFAULT_OPTIONS.legendPosition,
                                labels: {
                                    font: {
                                        size: DEFAULT_OPTIONS.legendLabelsFontSize,
                                    },
                                },
                            },
                            tooltip: {
                                enabled: DEFAULT_OPTIONS.tooltipsEnabled,
                            },
                            title: {
                                display: DEFAULT_OPTIONS.chartTitleVisible,
                                text: DEFAULT_OPTIONS.chartTitle,
                                font: {
                                    size: DEFAULT_OPTIONS.chartTitleFontSize,
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: DEFAULT_OPTIONS.xTitleVisible,
                                    align: DEFAULT_OPTIONS.xTitleAlign,
                                    text: DEFAULT_OPTIONS.xTitle,
                                    font: {
                                        size: DEFAULT_OPTIONS.xTitleFontSize,
                                    },
                                },
                                grid: {
                                    display: DEFAULT_OPTIONS.xGridLines,
                                    drawBorder: DEFAULT_OPTIONS.xBorder,
                                    color: DEFAULT_OPTIONS.xGridLinesColor,
                                },
                                ticks: {
                                    display: DEFAULT_OPTIONS.xTicks,
                                },
                            },
                            r: {
                                beginAtZero: DEFAULT_OPTIONS.startAtZero,
                                grid: {
                                    display: DEFAULT_OPTIONS.yGridLines,
                                    drawBorder: DEFAULT_OPTIONS.yBorder,
                                    color: DEFAULT_OPTIONS.yGridLinesColor,
                                },
                                ticks: {
                                    display: DEFAULT_OPTIONS.yTicks,
                                },
                            },
                        },
                    },
                }
                canvasChart = new Chart(canvasCtx, config)
            } else if (activeChart === 'pie' || activeChart === 'donut') {
                const backgroundColorArr = []
                const borderColorArr = []
                const localData = DATASETS[0].data.length
                    ? DATASETS[0].data
                    : DATASETS[0].defaultData.length
                    ? DATASETS[0].defaultData
                    : []

                if (localData.length) {
                    for (let i = 0; i < localData.length; i++) {
                        if (DATASETS[0].barOpacity !== 1) {
                            if (DATASETS[0].pieBackgroundColors[i]) {
                                const rgbColor = hexToRgb(DATASETS[0].pieBorderColors[i])
                                const rgbaColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${DATASETS[0].barOpacity})`
                                backgroundColorArr.push(rgbaColor)
                                borderColorArr.push(DATASETS[0].pieBorderColors[i])
                            } else {
                                const rgbColor = hexToRgb(DEFAULT_COLORS[i])
                                const rgbaColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${DATASETS[0].barOpacity})`
                                backgroundColorArr.push(rgbaColor)
                                borderColorArr.push(DEFAULT_COLORS[i])
                            }
                        } else {
                            if (DATASETS[0].pieBackgroundColors[i]) {
                                backgroundColorArr.push(DATASETS[0].pieBackgroundColors[i])
                                borderColorArr.push(DATASETS[0].pieBackgroundColors[i])
                            } else {
                                backgroundColorArr.push(DEFAULT_COLORS[i])
                                borderColorArr.push(DEFAULT_COLORS[i])
                            }
                        }
                    }
                }

                DATASETS[0].pieBackgroundColors = backgroundColorArr
                DATASETS[0].pieBorderColors = borderColorArr

                const localDatasets = DATASETS.map(function (obj) {
                    const newDataset = {
                        ...obj,
                        backgroundColor: backgroundColorArr,
                        borderColor: DATASETS[0].bordersTransparent
                            ? DEFAULT_OPTIONS.canvasBackground
                            : borderColorArr,
                        borderWidth: DEFAULT_OPTIONS.borderWidth,
                        borderAlign: 'inner',
                    }
                    if (
                        !newDataset.data.length &&
                        newDataset.defaultData &&
                        newDataset.defaultData.length
                    ) {
                        newDataset.data = newDataset.defaultData
                    }

                    return newDataset
                })

                const data = {
                    labels: LABELS,
                    datasets: localDatasets,
                }
                const config = {
                    type: 'pie',
                    data,
                    options: {
                        ...globalConfigOptions,
                        plugins: {
                            legend: {
                                display: DEFAULT_OPTIONS.legendEnabled,
                                position: DEFAULT_OPTIONS.legendPosition,
                                labels: {
                                    font: {
                                        size: DEFAULT_OPTIONS.legendLabelsFontSize,
                                    },
                                },
                            },
                            tooltip: {
                                enabled: DEFAULT_OPTIONS.tooltipsEnabled,
                            },
                            title: {
                                display: DEFAULT_OPTIONS.chartTitleVisible,
                                text: DEFAULT_OPTIONS.chartTitle,
                                font: {
                                    size: DEFAULT_OPTIONS.chartTitleFontSize,
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: DEFAULT_OPTIONS.xTitleVisible,
                                    align: DEFAULT_OPTIONS.xTitleAlign,
                                    text: DEFAULT_OPTIONS.xTitle,
                                    font: {
                                        size: DEFAULT_OPTIONS.xTitleFontSize,
                                    },
                                },
                                grid: {
                                    display: DEFAULT_OPTIONS.xGridLines,
                                    drawBorder: DEFAULT_OPTIONS.xBorder,
                                    color: DEFAULT_OPTIONS.xGridLinesColor,
                                },
                                ticks: {
                                    display: DEFAULT_OPTIONS.xTicks,
                                },
                            },
                            y: {
                                beginAtZero: DEFAULT_OPTIONS.startAtZero,
                                title: {
                                    display: DEFAULT_OPTIONS.yTitleVisible,
                                    align: DEFAULT_OPTIONS.yTitleAlign,
                                    text: DEFAULT_OPTIONS.yTitle,
                                    font: {
                                        size: DEFAULT_OPTIONS.yTitleFontSize,
                                    },
                                },
                                grid: {
                                    display: DEFAULT_OPTIONS.yGridLines,
                                    drawBorder: DEFAULT_OPTIONS.yBorder,
                                    color: DEFAULT_OPTIONS.yGridLinesColor,
                                },
                                ticks: {
                                    display: DEFAULT_OPTIONS.yTicks,
                                },
                            },
                        },
                        cutout: activeChart === 'pie' ? 0 : `${DEFAULT_OPTIONS.cutout}%`,
                        borderWidth: DEFAULT_OPTIONS.borderWidth,
                    },
                }
                canvasChart = new Chart(canvasCtx, config)
            }
        }
    })
})
