export type Gender = 'male' | 'female';
export type LicenseType = 'full' | 'provisional' | 'international' | 'automatic' | 'european-community' | 'other';
export type Title = 'mr' | 'mrs' | 'miss' | 'ms' | 'dr';
export type RelationshipStatus = 'single' | 'married' | 'civil-partnership' | 'divorced' | 'widowed';

export type DrivingRestriction =
    | 'aware-no-restrictions'
    | 'aware-1-year-restriction'
    | 'aware-2-year-restriction'
    | 'aware-3-year-restriction'
    | 'not-aware'
    | 'advised-not-to-drive-by-doctor';

export const MotoringOrganisationTypes = {
    AA: 'Automobile Association',
    AAIA: 'AA and IAM',
    AARA: 'AA and RAC',
    AIRA: 'A',
    BRES: 'Britannia Rescue',
    IAM: 'Institute Of Advanced Motorist',
    IAMM: 'IAM - Motorcycle Test',
    IARA: 'IAM and RAC',
    INAM: 'Institute - Advanced Motorists',
    NATB: 'Green Flag',
    OTHE: 'Other',
    RAC: 'Royal Automobile Club',
    ROSP: 'ROSPA Advanced Driving Test',
};

export const MedicalConditionsTypes = {
    'aware-no-restrictions': 'DVLA aware - no restrictions',
    'aware-1-year-restriction': 'DVLA aware - 1 year restricted license',
    'aware-2-year-restriction': 'DVLA aware - 2 year restricted license',
    'aware-3-year-restriction': 'DVLA aware - 3 year restricted license',
    'not-aware': 'DVLA not aware',
    'advised-not-to-drive-by-doctor': 'Advised not to drive by doctor',
};

export const MotoringConvictionType = {
    AC10: 'AC10 - Failure To Stop And Report',
    AC12: 'AC12 - Aiding And Abetting - AC10',
    AC14: 'AC14 - Causing Or Permitting - AC10',
    AC16: 'AC16 - Inciting - AC10',
    AC20: 'AC20 - Failure To Report Within 24 Hours',
    AC22: 'AC22 - Aiding And Abetting - AC20',
    AC24: 'AC24 - Causing Or Permitting - AC20',
    AC26: 'AC26 - Inciting - AC20',
    AC30: 'AC30 - Undefined Accident Offence',
    AC32: 'AC32 - Aiding And Abetting - AC30',
    AC34: 'AC34 - Causing Or Permitting - AC30',
    AC36: 'AC36 - Inciting - AC30',
    BA10: 'BA10 - Driving While Disqualified',
    BA12: 'BA12 - Aiding And Abetting - BA10',
    BA14: 'BA14 - Causing Or Permitting - BA10',
    BA16: 'BA16 - Inciting - BA10',
    BA20: 'BA20 - Driving While Disqualified As Under Age',
    BA22: 'BA22 - Aiding And Abetting - BA20',
    BA24: 'BA24 - Causing Or Permitting - BA20',
    BA26: 'BA26 - Inciting - BA20',
    BA30: 'BA30 - Attempting To Drive While Disqualified By Court',
    BA32: 'BA32 - Aiding And Abetting - BA30',
    BA34: 'BA34 - Causing Or Permitting - BA30',
    BA36: 'BA36 - Inciting - BA30',
    CD10: 'CD10 - Driving Without Due Care And Attention',
    CD12: 'CD12 - Aiding And Abetting - CD10',
    CD14: 'CD14 - Causing Or Permitting - CD10',
    CD16: 'CD16 - Inciting - CD10',
    CD20: 'CD20 - Driving Without Reasonable Consideration',
    CD22: 'CD22 - Aiding And Abetting - CD20',
    CD24: 'CD24 - Causing Or Permitting - CD20',
    CD26: 'CD26 - Inciting - CD20',
    CD30: 'CD30 - Driving Without Due Care Or Reasonable Consideration',
    CD32: 'CD32 - Aiding And Abetting - CD30',
    CD34: 'CD34 - Causing Or Permitting - CD30',
    CD36: 'CD36 - Inciting - CD30',
    CD40: 'CD40 - Causing Death By Careless Driving When Unfit Through Drink',
    CD42: 'CD42 - Aiding And Abetting - CD40',
    CD44: 'CD44 - Causing Or Permitting - CD40',
    CD46: 'CD46 - Inciting - CD40',
    CD50: 'CD50 - Causing Death By Careless Driving When Unfit Through Drugs',
    CD52: 'CD52 - Aiding And Abetting - CD50',
    CD54: 'CD54 - Causing Or Permitting - CD50',
    CD56: 'CD56 - Inciting - CD50',
    CD60: 'CD60 - Causing Death By Careless Driving With Above Limit Alcohol',
    CD62: 'CD62 - Aiding And Abetting - CD60',
    CD64: 'CD64 - Causing Or Permitting - CD60',
    CD66: 'CD66 - Inciting - CD60',
    CD70: 'CD70 - Cause Death By Careless Driving and Not Supply A Specimen',
    CD71: 'CD71 - Causing death by careless driving then failing to supply a specimen for DRUG analysis',
    CD72: 'CD72 - Aiding And Abetting - CD70',
    CD74: 'CD74 - Causing Or Permitting - CD70',
    CD76: 'CD76 - Inciting - CD70',
    CD80: 'CD80 - Causing Death By Careless / Inconsiderate Driving',
    CD82: 'CD82 - Aiding and abetting - CD80',
    CD84: 'CD84 - Causing or permitting - CD80',
    CD86: 'CD86 - Inciting - CD80',
    CD90: 'CD90 - Causing Death By Driving Unlicensed',
    CD92: 'CD92 - Aiding and abetting - CD90',
    CD94: 'CD94 - Causing or permitting - CD90',
    CD96: 'CD96 - Inciting - CD90',
    CU10: 'CU10 - Defective Brakes',
    CU12: 'CU12 - Aiding And Abetting - CU10',
    CU14: 'CU14 - Causing Or Permitting - CU10',
    CU16: 'CU16 - Inciting - CU10',
    CU20: 'CU20 - Dangerous Use (Not Brakes Steering Or Tyres)',
    CU22: 'CU22 - Aiding And Abetting - CU20',
    CU24: 'CU24 - Causing Or Permitting - CU20',
    CU26: 'CU26 - Inciting - CU20',
    CU30: 'CU30 - Defective Tyres',
    CU32: 'CU32 - Aiding And Abetting - CU30',
    CU34: 'CU34 - Causing Or Permitting - CU30',
    CU36: 'CU36 - Inciting - CU30',
    CU40: 'CU40 - Defective Steering',
    CU42: 'CU42 - Aiding And Abetting - CU40',
    CU44: 'CU44 - Causing Or Permitting - CU40',
    CU46: 'CU46 - Inciting - CU40',
    CU50: 'CU50 - Dangerous Load',
    CU52: 'CU52 - Aiding And Abetting - CU50',
    CU54: 'CU54 - Causing Or Permitting - CU50',
    CU56: 'CU56 - Inciting - CU50',
    CU60: 'CU60 - Undefined Construction And Use Failure',
    CU62: 'CU62 - Aiding And Abetting - CU60',
    CU64: 'CU64 - Causing Or Permitting - CU60',
    CU66: 'CU66 - Inciting - CU60',
    CU80: 'CU80 - Driving whilst using a mobile phone',
    CU82: 'CU82 - Aiding And Abetting - CU80',
    CU84: 'CU84 - Causing Or Permitting - CU80',
    CU86: 'CU86 - Inciting - CU80',
    DD10: 'DD10 - Dangerous Driving',
    DD12: 'DD12 - Aiding And Abetting - DD10',
    DD14: 'DD14 - Causing Or Permitting - DD10',
    DD16: 'DD16 - Inciting - DD10',
    DD20: 'DD20 - Dangerous Speed',
    DD22: 'DD22 - Aiding And Abetting - DD20',
    DD24: 'DD24 - Causing Or Permitting - DD20',
    DD26: 'DD26 - Inciting - DD20',
    DD30: 'DD30 - Reckless Driving',
    DD32: 'DD32 - Aiding And Abetting - DD30',
    DD34: 'DD34 - Causing Or Permitting - DD30',
    DD36: 'DD36 - Inciting - DD30',
    DD40: 'DD40 - Combination Of Dangerous Speed Or Reckless',
    DD42: 'DD42 - Aiding And Abetting - DD40',
    DD44: 'DD44 - Causing Or Permitting - DD40',
    DD46: 'DD46 - Inciting - DD40',
    DD50: 'DD50 - Death By Dangerous Driving',
    DD52: 'DD52 - Aiding And Abetting - DD50',
    DD54: 'DD54 - Causing Or Permitting - DD50',
    DD56: 'DD56 - Inciting - DD50',
    DD60: 'DD60 - Culpable Homicide While Driving',
    DD62: 'DD62 - Aiding And Abetting - DD60',
    DD64: 'DD64 - Causing Or Permitting - DD60',
    DD66: 'DD66 - Inciting - DD60',
    DD70: 'DD70 - Death By Reckless Driving',
    DD72: 'DD72 - Aiding And Abetting - DD70',
    DD74: 'DD74 - Causing Or Permitting - DD70',
    DD76: 'DD76 - Inciting - DD70',
    DD80: 'DD80 - Causing Death By Dangerous Driving',
    DD82: 'DD82 - Aiding And Abetting - DD80',
    DD84: 'DD84 - Causing Or Permitting - DD80',
    DD86: 'DD86 - Inciting - DD80',
    DD90: 'DD90 - Furious Driving',
    DD92: 'DD92 - Aiding And Abetting - DD90',
    DD94: 'DD94 - Causing Or Permitting - DD90',
    DD96: 'DD96 - Inciting - DD90',
    DG10: 'DG10 - Driving Or Attempting To Drive With Drug Level Above Specified Limit',
    DG12: 'DG12 - Aiding And Abetting - DG10',
    DG14: 'DG14 - Causing Or Permitting - DG10',
    DG16: 'DG16 - Inciting - DG10',

    DG40: 'DG40 - In Charge Of A Vehicle While Drug Level Above Specified Limit',
    DG42: 'DG42 - Aiding And Abetting - DG40',
    DG44: 'DG44 - Causing Or Permitting - DG40',
    DG46: 'DG46 - Inciting - DG40',

    DG60: 'DG60 - Causing Death By Careless Driving With Drug Level Above The Limit',
    DG62: 'DG62 - Aiding And Abetting - DG60',
    DG64: 'DG64 - Causing Or Permitting - DG60',
    DG66: 'DG66 - Inciting - DG60',
    DR10: 'DR10 - Driving With Alcohol Over Limit',
    DR12: 'DR12 - Aiding And Abetting - DR10',
    DR14: 'DR14 - Causing Or Permitting - DR10',
    DR16: 'DR16 - Inciting - DR10',
    DR20: 'DR20 - Driving Unfit Through Drink Or Drugs',
    DR22: 'DR22 - Aiding And Abetting - DR20',
    DR24: 'DR24 - Causing Or Permitting - DR20',
    DR26: 'DR26 - Inciting - DR20',
    DR30: 'DR30 - Refusing To Supply Specimen',
    DR31: 'DR31 - Refusing To Supply Specimen For Drug Analysis',
    DR32: 'DR32 - Aiding And Abetting - DR30',
    DR34: 'DR34 - Causing Or Permitting - DR30',
    DR36: 'DR36 - Inciting - DR30',
    DR40: 'DR40 - Drunk In Charge',
    DR42: 'DR42 - Aiding And Abetting - DR40',
    DR44: 'DR44 - Causing Or Permitting - DR40',
    DR46: 'DR46 - Inciting - DR40',
    DR50: 'DR50 - In Charge While Unfit Through Drink Or Drugs',
    DR52: 'DR52 - Aiding And Abetting - DR50',
    DR54: 'DR54 - Causing Or Permitting - DR50',
    DR56: 'DR56 - Inciting - DR50',
    DR60: 'DR60 - In Charge And Refusing To Supply Specimen',
    DR61: 'DR61 - In Charge And Refusing To Supply Specimen For Drug Analysis',
    DR62: 'DR62 - Aiding And Abetting - DR60',
    DR64: 'DR64 - Causing Or Permitting - DR60',
    DR66: 'DR66 - Inciting - DR60',
    DR70: 'DR70 - Failing To Take Breath Test',
    DR72: 'DR72 - Aiding And Abetting - DR70',
    DR74: 'DR74 - Causing Or Permitting - DR70',
    DR76: 'DR76 - Inciting - DR70',
    DR80: 'DR80 - Driving Or Attempting To Drive When Unfit Through Drugs',
    DR82: 'DR82 - Aiding And Abetting - DR80',
    DR84: 'DR84 - Causing Or Inciting - DR80',
    DR86: 'DR86 - Inciting - DR80',
    DR90: 'DR90 - In Charge Of A Vehicle When Unfit Through Drugs',
    DR92: 'DR92 - Aiding And Abetting - DR90',
    DR94: 'DR94 - Causing Or Permitting - DR90',
    DR96: 'DR96 - Inciting - DR90',
    IN10: 'IN10 - Driving Uninsured',
    IN12: 'IN12 - Aiding And Abetting - IN10',
    IN14: 'IN14 - Causing Or Permitting - IN10',
    IN16: 'IN16 - Inciting - IN10',
    LC10: 'LC10 - Driving Without Licence',
    LC12: 'LC12 - Aiding And Abetting - LC10',
    LC14: 'LC14 - Causing Or Permitting - LC10',
    LC16: 'LC16 - Inciting - LC10',
    LC20: 'LC20 - Driving otherwise than in accordance with a licence',
    LC22: 'LC22 - Aiding Abetting - LC20',
    LC24: 'LC24 - Causing Permitting -LC20',
    LC26: 'LC26 - Inciting - LC20',
    LC30: 'LC30 - Driving After False Decl Re Fitness When Licence Applied For',
    LC32: 'LC32 - Aiding And Abetting - LC30',
    LC34: 'LC34 - Causing Or Permitting - LC30',
    LC36: 'LC36 - Inciting - LC30',
    LC40: 'LC40 - Driving A Vehicle Having Failed To Notify A Disability',
    LC42: 'LC42 - Aiding And Abetting - LC40',
    LC44: 'LC44 - Causing Or Permitting - LC40',
    LC46: 'LC46 - Inciting - LC40',
    LC50: 'LC50 - Driving After A Licence Revoked Or Refused On Medical Grounds',
    LC52: 'LC52 - Aiding And Abetting - LC50',
    LC54: 'LC54 - Causing Or Permitting - LC50',
    LC56: 'LC56 - Inciting - LC50',
    MR09: 'MR09 - Disqualification, Reckless and Dangerous Driving (Eire) - MR09',
    MR19: 'MR19 - Disqualification, Failure To Stop After Accident (Eire) - MR19',
    MR29: 'MR29 - Disqualification, Driving Under The Influence (Eire) - MR29',
    MR39: 'MR39 - Disqualification, Speeding (Eire) - MR39',
    MR49: 'MR49 - Disqualification, Driving Whilst Disqualified (Eire) - MR49',
    MR59: 'MR59 - Disqualification, Other Offence (Eire) - MR59',
    MS10: 'MS10 - Leaving Vehicle In Dangerous Position',
    MS12: 'MS12 - Aiding And Abetting - MS10',
    MS14: 'MS14 - Causing Or Permitting - MS10',
    MS16: 'MS16 - Inciting - MS10',
    MS20: 'MS20 - Unlawful Pillion Riding',
    MS22: 'MS22 - Aiding And Abetting - MS20',
    MS24: 'MS24 - Causing Or Permitting - MS20',
    MS26: 'MS26 - Inciting - MS20',
    MS30: 'MS30 - Playstreet Offence',
    MS32: 'MS32 - Aiding And Abetting - MS30',
    MS34: 'MS34 - Causing Or Permitting - MS30',
    MS36: 'MS36 - Inciting - MS30',
    MS40: 'MS40 - Uncorrected Eyesight Or Refusing Test',
    MS42: 'MS42 - Aiding And Abetting - MS40',
    MS44: 'MS44 - Causing Or Permitting - MS40',
    MS46: 'MS46 - Inciting - MS40',
    MS50: 'MS50 - Motor Racing On Highway',
    MS52: 'MS52 - Aiding And Abetting - MS50',
    MS54: 'MS54 - Causing Or Permitting - MS50',
    MS56: 'MS56 - Inciting - MS50',
    MS60: 'MS60 - Offence Not Covered By Other Codes',
    MS62: 'MS62 - Aiding And Abetting - MS60',
    MS64: 'MS64 - Causing Or Permitting - MS60',
    MS66: 'MS66 - Inciting - MS60',
    MS70: 'MS70 - Uncorrected Defective Eyesight',
    MS72: 'MS72 - Aiding And Abetting - MS70',
    MS74: 'MS74 - Causing Or Permitting - MS70',
    MS76: 'MS76 - Inciting - MS70',
    MS80: 'MS80 - Refusing Eyesight Test',
    MS82: 'MS82 - Aiding And Abetting - MS80',
    MS84: 'MS84 - Causing Or Permitting - MS80',
    MS86: 'MS86 - Inciting - MS80',
    MS90: 'MS90 - Failure To Give Information As To Identity Of Driver Etc',
    MS92: 'MS92 - Aiding And Abetting - MS90',
    MS94: 'MS94 - Causing Or Permitting - MS90',
    MS96: 'MS96 - Inciting - MS90',
    MW10: 'MW10 - Contravening Special Road Regulations (Not Speed)',
    MW12: 'MW12 - Aiding And Abetting - MW10',
    MW14: 'MW14 - Causing Or Permitting - MW10',
    MW16: 'MW16 - Inciting - MW10',
    NI09: 'NI09 - GB Driver disqualified in NI',
    NE99: 'NE99 - Non Endorsable Offence',
    NR09: 'NR09 - GB drivers revoked under the New Drivers Act in NI',
    PC10: 'PC10 - Pedestrian Crossing (Undefined)',
    PC12: 'PC12 - Aiding And Abetting - PC10',
    PC14: 'PC14 - Causing Or Permitting - PC10',
    PC16: 'PC16 - Inciting - PC10',
    PC20: 'PC20 - Moving Vehicle And Pedestrian Crossing',
    PC22: 'PC22 - Aiding And Abetting - PC20',
    PC24: 'PC24 - Causing Or Permitting - PC20',
    PC26: 'PC26 - Inciting - PC20',
    PC30: 'PC30 - Stationary Vehicle And Pedestrian Crossing',
    PC32: 'PC32 - Aiding And Abetting - PC30',
    PC34: 'PC34 - Causing Or Permitting - PC30',
    PC36: 'PC36 - Inciting - PC30',
    PL10: 'PL10 - Driving Without L Plates',
    PL12: 'PL12 - Aiding And Abetting - PL10',
    PL14: 'PL14 - Causing Or Permitting - PL10',
    PL16: 'PL16 - Inciting - PL10',
    PL20: 'PL20 - Driving Unaccompanied',
    PL22: 'PL22 - Aiding And Abetting - PL20',
    PL24: 'PL24 - Causing Or Permitting - PL20',
    PL26: 'PL26 - Inciting - PL20',
    PL30: 'PL30 - Carrying A Person Not Qualified',
    PL32: 'PL32 - Aiding And Abetting - PL30',
    PL34: 'PL34 - Causing Or Permitting - PL30',
    PL36: 'PL36 - Inciting - PL30',
    PL40: 'PL40 - Drawing Unauthorised Trailer',
    PL42: 'PL42 - Aiding And Abetting - PL40',
    PL44: 'PL44 - Causing Or Permitting - PL40',
    PL46: 'PL46 - Inciting - PL40',
    PL50: 'PL50 - Undefined Provisional Offence',
    PL52: 'PL52 - Aiding And Abetting - PL50',
    PL54: 'PL54 - Causing Or Permitting - PL50',
    PL56: 'PL56 - Inciting - PL50',
    QI09: 'QI09 - GB Drivers disqualified in Isle of Man',
    SC19: 'SC19 - Section 19 (Transport Act 1981) Disqualification',
    SC35: 'SC35 - Section 35 (Transport Act 1981) Disqualification',
    SP10: 'SP10 - Speeding Goods Vehicle',
    SP12: 'SP12 - Aiding And Abetting - SP10',
    SP14: 'SP14 - Causing Or Permittng - SP10',
    SP16: 'SP16 - Inciting - SP10',
    SP20: 'SP20 - Speeding (Not Goods Or Passenger)',
    SP22: 'SP22 - Aiding And Abetting - SP20',
    SP24: 'SP24 - Causing Or Permitting - SP20',
    SP26: 'SP26 - Inciting - SP20',
    SP30: 'SP30 - Exceeding Statutory Speed Limit',
    SP32: 'SP32 - Aiding And Abetting - SP30',
    SP34: 'SP34 - Causing Or Permitting - SP30',
    SP36: 'SP36 - Inciting - SP30',
    SP40: 'SP40 - Exceeding Passenger Vehicle Speed Limit',
    SP42: 'SP42 - Aiding And Abetting - SP40',
    SP44: 'SP44 - Causing Or Permitting - SP40',
    SP46: 'SP46 - Inciting - SP40',
    SP50: 'SP50 - Exceeding Motorway Limit',
    SP52: 'SP52 - Aiding And Abetting - SP50',
    SP54: 'SP54 - Causing Or Permitting - SP50',
    SP56: 'SP56 - Inciting - SP50',
    SP60: 'SP60 - Undefined Speeding Offence',
    SP62: 'SP62 - Aiding And Abetting - SP60',
    SP64: 'SP64 - Causing Or Permitting - SP60',
    SP66: 'SP66 - Inciting - SP60',
    TS10: 'TS10 - Traffic Lights Offence',
    TS12: 'TS12 - Aiding And Abetting - TS10',
    TS14: 'TS14 - Causing Or Permitting - TS10',
    TS16: 'TS16 - Inciting - TS10',
    TS20: 'TS20 - Double White Line Offence',
    TS22: 'TS22 - Aiding And Abetting - TS20',
    TS24: 'TS24 - Causing Or Permitting - TS20',
    TS26: 'TS26 - Inciting - TS20',
    TS30: 'TS30 - Stop Sign Offence',
    TS32: 'TS32 - Aiding And Abetting - TS30',
    TS34: 'TS34 - Causing Or Permitting - TS30',
    TS36: 'TS36 - Inciting - TS30',
    TS40: 'TS40 - Traffic Constable Offence',
    TS42: 'TS42 - Aiding And Abetting - TS40',
    TS44: 'TS44 - Causing Or Permitting - TS40',
    TS46: 'TS46 - Inciting - TS40',
    TS50: 'TS50 - Traffic Signs Offence (Ex Lights Stop Or Double White Line)',
    TS52: 'TS52 - Aiding And Abetting - TS50',
    TS54: 'TS54 - Causing Or Permitting - TS50',
    TS56: 'TS56 - Inciting - TS50',
    TS60: 'TS60 - School Crossing Offence',
    TS62: 'TS62 - Aiding And Abetting - TS60',
    TS64: 'TS64 - Causing Or Permitting - TS60',
    TS66: 'TS66 - Inciting - TS60',
    TS70: 'TS70 - Undefined Traffic Signs Or Direction',
    TS72: 'TS72 - Aiding And Abetting - TS70',
    TS74: 'TS74 - Causing Or Permitting - TS70',
    TS76: 'TS76 - Inciting - TS70',
    TT99: 'TT99 - Disqualified under totting up procedure',
    UT10: 'UT10 - Taking And Driving Away',
    UT12: 'UT12 - Aiding And Abetting - UT10',
    UT14: 'UT14 - Causing Or Permitting - UT10',
    UT16: 'UT16 - Inciting - UT10',
    UT20: 'UT20 - Stealing A Vehicle',
    UT22: 'UT22 - Aiding And Abetting - UT20',
    UT24: 'UT24 - Causing Or Permitting - UT20',
    UT26: 'UT26 - Inciting - UT20',
    UT30: 'UT30 - Going Equipped To Steal Or Take Away',
    UT32: 'UT32 - Aiding And Abetting - UT30',
    UT34: 'UT34 - Causing Or Permitting - UT30',
    UT36: 'UT36 - Inciting - UT30',
    UT40: 'UT40 - Taking Riding Knowingly Driving',
    UT42: 'UT42 - Aiding And Abetting - UT40',
    UT44: 'UT44 - Causing Or Permitting - UT40',
    UT46: 'UT46 - Inciting - UT40',
    UT50: 'UT50 - Aggravated Taking Of A Vehicle',
    UT52: 'UT52 - Aiding And Abetting - UT50',
    UT54: 'UT54 - Causing Or Permitting - UT50',
    UT56: 'UT56 - Inciting - UT50',
    XX99: 'XX99 - Totting Up Disqualification',
    Z001: 'Z001 - Non-Road Traffic Act - Fraud',
    Z002: 'Z002 - Non-Road Traffic Act - Robbery',
    Z003: 'Z003 - Non-Road Traffic Act - Theft',
    Z004: 'Z004 - Non-Road Traffic Act - Handling Stolen Goods',
    Z005: 'Z005 - Prosecution Pending',
    Z006: 'Z006 - Parking Offence',
    Z007: 'Z007 - Disqualification Under Section 34 Of The Road Traffic Offenders Act',
    Z008: 'Z008 - Disqualification Under Section 35 Of The Road Traffic Offenders Act',
    Z010: 'Z010 - Tachograph Offence',
};

export const MotoringIncidentTypes = {
    S001: 'Single Vehicle - Driver skidded',
    S002: 'Single Vehicle - Driver hit pedestrian',
    S003: 'Single Vehicle - Driver hit animal',
    S004: 'Single Vehicle - Driver hit cyclist',
    S005: 'Single Vehicle - Driver hit stationary car',
    S006: 'Single Vehicle - Driver hit immobile object',
    S007: 'Single Vehicle - Driver reversed into car',
    S008: 'Single Vehicle - Unknown third party hit stopped insured',
    S060: 'Object Hit Vehicle',
    M001: 'Multiple Vehicle - Driver hit Third Party',
    M002: 'Multiple Vehicle - Driver hit Third Party in rear',
    M003: `Multiple Vehicle - Driver cut into Third Party's lane`,
    M004: 'Multiple Vehicle - Driver hit third party when third party braked',
    M005: 'Multiple Vehicle - Driver hit parked vehicle',
    M006: 'Multiple Vehicle - Driver lost control and hit another vehicle',
    M007: 'Multiple Vehicle - Driver ignored Stop sign and hit another vehicle',
    M008: 'Multiple Vehicle - Driver ignored Red Light and hit another vehicle',
    M051: 'Multiple Vehicle - Third Party hit Driver',
    M052: 'Multiple Vehicle - Third Party hit Driver in rear',
    M053: `Multiple Vehicle - Third Party cut into Driver's lane`,
    M054: 'Multiple Vehicle - Third Party swerved and hit Driver',
    M055: 'Multiple Vehicle - Third Party ignored Stop sign and hit Driver',
    M056: 'Multiple Vehicle - Third Party ignored Red light and hit Driver',
    M060: 'Multiple Vehicle - Object hit vehicle',
    M100: 'Multiple Vehicle - Both vehicles reversed in car park',
    M101: 'Multiple Vehicle - Both vehicles reversed in street',
    M102: 'Multiple Vehicle - Multi vehicle collision',
    M103: 'Multiple Vehicle - Fatal accident',
    T001: 'Theft of vehicle',
    T002: 'Theft - Attempted theft of vehicle',
    T003: 'Theft - Vehicle not recovered',
    T004: 'Theft - Theft, vehicle recovered',
    T005: 'Theft - Theft, vehicle repairable',
    C001: 'Contents Theft - Theft of contents',
    C002: 'Contents Theft - Attempted theft of contents',
    C003: 'Contents Theft - Theft of personal effects',
    L001: 'Total Theft Loss',
    L002: 'Total Theft Loss - Theft, Total Loss, vehicle not recovered',
    L003: 'Total Theft Loss - Theft, Total Loss, vehicle recovered',
    L004: 'Theft of Vehicle Total Loss',
    F001: 'Fire - Fire, partial damage',
    F002: 'Fire - Fire, Total Loss',
    W001: 'Windscreen - Windscreen Smashed',
    W002: 'Windscreen - Windscreen Cracked',
    V001: 'Vandalism - Vandalism, repairable',
    V002: 'Vandalism - Vandalism, Total Loss',
    O001: 'Other - Weather Damage',
    O002: 'Other - Storm Damage',
};

export type MotoringOrganisation = keyof typeof MotoringOrganisationTypes;

export type MotoringIncidentCode = keyof typeof MotoringIncidentTypes;

export type MotoringConvictionCode = keyof typeof MotoringConvictionType;

export interface IMotoringConviction {
    id: number;
    driver_id: number;
    date?: string
    code?: MotoringConvictionCode
    penalty_points?: number
    fine_cents?: number
    months_banned?: number
}

export interface IMotoringIncident {
    id: number;
    driver_id: number;
    date?: string
    code?: MotoringIncidentCode
    cost_cents?: number
    third_party_cost_cents?: number
    fault?: boolean
    personal_injury?: boolean
    current_policy?: boolean
}

export interface IDriversReduxState {
    list: IDriver[];
    isLoading: boolean;
}

export interface IDriver {
    id: number|string;
    users_id: number;
    title: Title;
    first_name: string;
    last_name: string;
    gender: Gender;
    date_of_birth: string|Date;
    insurance_refused?: boolean;
    licence_years_held?: number|null;
    licence_state?: LicenseType;
    licence_number?: number;
    no_claims_discount?: number;
    relationship_status?: RelationshipStatus;
    born_in_uk?: boolean;
    uk_resident_since?: string|Date;
    industry?: string;
    monitoring_organisation?: MotoringOrganisation;
    smoker?: boolean;
    tests_taken?: number | null;
    vocation?: string;
    incidents_claims?: boolean;
    motoring_convictions?: boolean;
}

export interface IDriverDetailsFormValues extends IDriver {
    motoring_incidents_attributes?: Array<any>,
    motoring_convictions_attributes?: Array<any>;
}