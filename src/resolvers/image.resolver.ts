import {Args, Mutation, Resolver} from '@nestjs/graphql'
import {Inject} from '@nestjs/common';
import {ImageSerializer} from '../serializers'
import {Auth, AdminRole, ClientRole, MasterRole, User} from '../common';
import {ImageInterface} from '../services/interfaces';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import {ImageService} from '../services/implements';

@Auth(
    MasterRole.ADMIN_MASTER,
    AdminRole.ADMIN_MANAGER,
    AdminRole.ADMIN_STAFF,
    ClientRole.USER_CLIENT
)
@Resolver(of => ImageSerializer)
export class ImageResolver {
    constructor(
        private readonly imageService: ImageService
    ) {
    }

    @Mutation(() => ImageSerializer, {
        name: 'uploadImage'
    })
    async upload(
        @Args({
            name: 'image',
            type: () => GraphQLUpload
        }) input: FileUpload,
        @User('id') userId: string
    ): Promise<ImageSerializer> {
        return this.imageService.upload(userId, input)
    }
}
