import {
    LineNotifyCallbackDto
} from '../../controllers/dto'

export interface LineInterface {
    accessNotify(userId: string, redirectUrl: string): Promise<any>
    revokeNotify(userId: string): Promise<any>
    rebindNotify(userId: string, redirectUrl: string): Promise<any>
    notifyCallback(dto: LineNotifyCallbackDto): Promise<any>
    pushMessageToMember(memberId: string): Promise<any>
    pushMessageToDesigner(designerId: string): Promise<any>
}
