export const You = {
    name: 'You',
    id: 'you',
};

export const CompanyDirector = {
    name: 'Company director',
    id: 'company_director',
};

export const Employee = {
    name: 'Employee',
    id: 'employee',
};

export const Employer = {
    name: 'Employer',
    id: 'employer',
};

export const Garage = {
    name: 'Garage',
    id: 'garage',
};

export const OtherFamilyMember = {
    name: 'Other family member',
    id: 'other_family_member',
};

export const Partner = {
    name: 'Partner',
    id: 'partner',
};

export const CivilPartner = {
    name: 'Civil Partner',
    id: 'civil_partner',
};

export const PartnerCommonLow = {
    name: 'Partner / common law',
    id: 'partner_common_law',
};

export const SonOrDaughter = {
    name: 'Son or daughter',
    id: 'son_or_daughter',
};

export const Spouse = {
    name: 'Spouse',
    id: 'spouse',
};

export const VehicleLeasingCompany = {
    name: 'Vehicle leasing company',
    id: 'lease_company',
};

const VehicleKeeper = [
    CompanyDirector,
    Employee,
    Employer,
    Garage,
    OtherFamilyMember,
    Partner,
    CivilPartner,
    PartnerCommonLow,
    SonOrDaughter,
    Spouse,
    VehicleLeasingCompany
];

const VehicleOwner = [
    CompanyDirector,
    Employee,
    Employer,
    Garage,
    OtherFamilyMember,
    Partner,
    CivilPartner,
    PartnerCommonLow,
    SonOrDaughter,
    Spouse,
    VehicleLeasingCompany
];

export default {
    VehicleKeeper,
    VehicleOwner,
}