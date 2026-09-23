import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { type User } from '@prisma/client';

import { db } from './db';

export const userRoles = ['CUSTOMER', 'SELLER', 'ADMIN', 'OWNER'] as const;
export type UserRole = (typeof userRoles)[number];
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
export type SessionUser = Pick<User, 'id' | 'email' | 'name'> & { role: UserRole; status: UserStatus };

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function createSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function isRoleAllowed(userRole: string | null | undefined, allowedRoles: UserRole[]) {
  return !!userRole && allowedRoles.includes(userRole as UserRole);
}

export function canAccessUser(user: SessionUser | null, targetUserId: string | null | undefined) {
  return !!user && !!targetUserId && (user.id === targetUserId || isRoleAllowed(user.role, ['ADMIN', 'OWNER']));
}

export async function createSessionForUser(userId: string) {
  const token = createSecureToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await db.session.create({ data: { token, userId, expiresAt } });
  return token;
}

export async function getSessionUserByToken(token: string | undefined | null): Promise<SessionUser | null> {
  if (!token) return null;
  const session = await db.session.findUnique({ where: { token }, include: { user: true } });
  if (!session) return null;
  if (session.expiresAt <= new Date()) {
    await db.session.delete({ where: { id: session.id } });
    return null;
  }
  if (!userRoles.includes(session.user.role as UserRole)) return null;
  const status = session.user.status as UserStatus;
  if (!['ACTIVE', 'INACTIVE', 'SUSPENDED'].includes(status)) return null;
  return { id: session.user.id, email: session.user.email, role: session.user.role as UserRole, status, name: session.user.name };
}

export async function writeAuditLog(action: string, details: string, userId?: string) {
  await db.auditLog.create({ data: { action, details, userId: userId || null } });
}

export function isAccountActive(status: UserStatus | null | undefined) {
  return status === 'ACTIVE';
}
