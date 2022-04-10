import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import {ConfigService} from '@nestjs/config';

class TypeormService {
  public getTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get<string>('TYPEORM_HOST', 'postgres'),
      port: configService.get<number>('TYPEORM_PORT', 5432),
      username: configService.get<string>('TYPEORM_USERNAME', 'test'),
      password: configService.get<string>('TYPEORM_PASSWORD', 'test'),
      database: configService.get<string>('TYPEORM_DATABASE', 'postgres'),
      entities: [
        configService.get<string>('TYPEORM_ENTITIES', 'src/**/**.entity.ts'),
      ],
      migrations: [
        configService.get<string>('TYPEORM_MIGRATIONS', 'src/database/migrations/**.ts'),
      ],
      subscribers: [
        configService.get<string>('TYPEORM_SUBSCRIBERS', 'src/database/subscribers/**.ts'),
      ],
      cli: {
        migrationsDir: configService.get<string>('TYPEORM_MIGRATIONS_DIR', 'postgres'),
        subscribersDir: configService.get<string>('TYPEORM_SUBSCRIBERS_DIR', 'postgres'),
      },
      synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE', false),
      logging: configService.get<boolean>('TYPEORM_LOGGING', false),
    }
  }
}

export const typeorm = new TypeormService()
