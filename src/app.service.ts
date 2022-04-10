import { Injectable } from '@nestjs/common'
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
	constructor(
		private health: HealthCheckService,
		private db: TypeOrmHealthIndicator,
		private configService: ConfigService
	) {}
	getVersion() {
		return this.configService.get<string>('VERSION', '1.0.0')
	}
	getHealthCheck() {
		return this.health.check([
			() => this.db.pingCheck('database'),
		])
	}
}
