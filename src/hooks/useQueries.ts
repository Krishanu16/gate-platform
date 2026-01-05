import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { Principal } from '@icp-sdk/core/principal';
import type { PersistentUserProfile, ContentModule } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<PersistentUserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegister() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.register(email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSimulatePayment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionToken: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.simulatePayment(sessionToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetContentModules() {
  const { actor, isFetching } = useActor();
  const { data: userProfile } = useGetCallerUserProfile();

  return useQuery<ContentModule[]>({
    queryKey: ['contentModules'],
    queryFn: async () => {
      if (!actor || !userProfile) return [];
      return actor.getContentModules(userProfile.sessionToken);
    },
    enabled: !!actor && !isFetching && !!userProfile && userProfile.isPaid,
  });
}

export function useUpdateProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      contentModuleId,
      progress,
      sessionToken,
    }: {
      contentModuleId: string;
      progress: bigint;
      sessionToken: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProgress(contentModuleId, progress, sessionToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAllUsers() {
  const { actor, isFetching } = useActor();
  const { data: isAdmin } = useIsCallerAdmin();

  return useQuery<Array<[Principal, PersistentUserProfile]>>({
    queryKey: ['allUsers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUsers();
    },
    enabled: !!actor && !isFetching && !!isAdmin,
  });
}

export function useRevokeUserSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userPrincipal: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.revokeUserSession(Principal.fromText(userPrincipal));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
      queryClient.invalidateQueries({ queryKey: ['activeSessions'] });
    },
  });
}

export function useUpdateUserPaymentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, isPaid }: { user: string; isPaid: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateUserPaymentStatus(Principal.fromText(user), isPaid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });
}

export function useAddContentModule() {
  const { actor } = useActor();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentModule }: { contentModule: ContentModule }) => {
      if (!actor || !userProfile) throw new Error('Actor or profile not available');
      return actor.addContentModule(contentModule, userProfile.sessionToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentModules'] });
    },
  });
}

export function useDeleteContentModule() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contentModuleId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteContentModule(contentModuleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentModules'] });
    },
  });
}

// Device Management Hooks
export function useRecordDeviceFingerprint() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ deviceFingerprint, sessionToken }: { deviceFingerprint: string; sessionToken: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.recordDeviceFingerprint(deviceFingerprint, sessionToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useVerifyDeviceFingerprint() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ deviceFingerprint, sessionToken }: { deviceFingerprint: string; sessionToken: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.verifyDeviceFingerprint(deviceFingerprint, sessionToken);
    },
  });
}

export function useAdminResetDevice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userPrincipal: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.adminResetDevice(Principal.fromText(userPrincipal));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
      queryClient.invalidateQueries({ queryKey: ['activeSessions'] });
    },
  });
}

export function useGetActiveSessions() {
  const { actor, isFetching } = useActor();
  const { data: isAdmin } = useIsCallerAdmin();

  return useQuery<Array<[Principal, PersistentUserProfile]>>({
    queryKey: ['activeSessions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveSessions();
    },
    enabled: !!actor && !isFetching && !!isAdmin,
  });
}

export function useRevokeAccess() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userPrincipal: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.revokeAccess(Principal.fromText(userPrincipal));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
      queryClient.invalidateQueries({ queryKey: ['activeSessions'] });
    },
  });
}

export function useSetExpiryDate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, expiryDate }: { user: string; expiryDate: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setExpiryDate(Principal.fromText(user), expiryDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
      queryClient.invalidateQueries({ queryKey: ['activeSessions'] });
    },
  });
}

export function useGetExpiryDate() {
  const { actor, isFetching } = useActor();

  return useMutation({
    mutationFn: async (userPrincipal: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.getExpiryDate(Principal.fromText(userPrincipal));
    },
  });
}
