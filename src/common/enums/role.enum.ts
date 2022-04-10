import {registerEnumType} from '@nestjs/graphql';

export enum MasterRole {
    ADMIN_MASTER = 'admin_master',
}

export enum AdminRole {
    // admin
    ADMIN_MANAGER = 'admin_manager',
    ADMIN_STAFF = 'admin_staff',
}

export enum ClientRole {
    // user
    USER_CLIENT = 'user_client',
}

registerEnumType(ClientRole, {
    name: 'ClientRole',
    description: 'The supported colors.',
});
