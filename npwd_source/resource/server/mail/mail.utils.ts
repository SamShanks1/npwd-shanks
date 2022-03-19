import { mainLogger } from '../sv_logger';

export const mailLogger = mainLogger.child({ module: 'mail' });