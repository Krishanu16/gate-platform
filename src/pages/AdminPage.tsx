import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';
import {
  useGetAllUsers,
  useRevokeUserSession,
  useUpdateUserPaymentStatus,
  useAddContentModule,
  useDeleteContentModule,
  useGetContentModules,
  useAdminResetDevice,
  useGetActiveSessions,
  useRevokeAccess,
  useSetExpiryDate,
} from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Shield, Users, FileText, Trash2, Smartphone, Clock, Ban, AlertTriangle, CheckCircle } from 'lucide-react';
import { ExternalBlob } from '../backend';
import type { ContentModule } from '../backend';

export default function AdminPage() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { data: users, isLoading: usersLoading } = useGetAllUsers();
  const { data: modules } = useGetContentModules();
  const { data: activeSessions } = useGetActiveSessions();
  const revokeSession = useRevokeUserSession();
  const updatePaymentStatus = useUpdateUserPaymentStatus();
  const addModule = useAddContentModule();
  const deleteModule = useDeleteContentModule();
  const resetDevice = useAdminResetDevice();
  const revokeAccess = useRevokeAccess();
  const setExpiryDate = useSetExpiryDate();

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDescription, setNewModuleDescription] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [selectedUserForExpiry, setSelectedUserForExpiry] = useState<string>('');
  const [expiryDateInput, setExpiryDateInput] = useState('2026-03');

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      navigate({ to: '/' });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const handleRevokeSession = async (userPrincipal: string) => {
    try {
      await revokeSession.mutateAsync(userPrincipal);
      toast.success('Session revoked successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to revoke session');
    }
  };

  const handleTogglePaymentStatus = async (userPrincipal: string, currentStatus: boolean) => {
    try {
      await updatePaymentStatus.mutateAsync({ user: userPrincipal, isPaid: !currentStatus });
      toast.success('Payment status updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update payment status');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!newModuleTitle || !newModuleDescription) {
      toast.error('Please enter module title and description first');
      return;
    }

    setUploadingFiles(true);

    try {
      const blobs: ExternalBlob[] = [];

      for (const file of Array.from(files)) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(uint8Array);
        blobs.push(blob);
      }

      const newModule: ContentModule = {
        id: `module-${Date.now()}`,
        title: newModuleTitle,
        description: newModuleDescription,
        content: blobs,
      };

      await addModule.mutateAsync({ contentModule: newModule });
      toast.success('Module added successfully');
      setNewModuleTitle('');
      setNewModuleDescription('');
      e.target.value = '';
    } catch (error: any) {
      toast.error(error.message || 'Failed to add module');
    } finally {
      setUploadingFiles(false);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      await deleteModule.mutateAsync(moduleId);
      toast.success('Module deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete module');
    }
  };

  const handleResetDevice = async (userPrincipal: string) => {
    try {
      await resetDevice.mutateAsync(userPrincipal);
      toast.success('Device reset successfully - user can now login from a new device');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset device');
    }
  };

  const handleRevokeAccess = async (userPrincipal: string) => {
    try {
      await revokeAccess.mutateAsync(userPrincipal);
      toast.success('Access revoked instantly - user session terminated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to revoke access');
    }
  };

  const handleSetExpiryDate = async () => {
    if (!selectedUserForExpiry) {
      toast.error('Please select a user');
      return;
    }

    try {
      // Parse the date input (format: YYYY-MM)
      const [year, month] = expiryDateInput.split('-').map(Number);
      const expiryDate = new Date(year, month - 1, 1);
      const expiryTimestamp = BigInt(expiryDate.getTime() * 1000000); // Convert to nanoseconds

      await setExpiryDate.mutateAsync({
        user: selectedUserForExpiry,
        expiryDate: expiryTimestamp,
      });
      toast.success('Expiry date updated successfully');
      setSelectedUserForExpiry('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to set expiry date');
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDateTime = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen grid-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <div className="p-3 bg-notebook-dark rounded-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-5xl md:text-6xl text-notebook-dark">Admin Control Panel</h1>
              <p className="font-handwritten text-xl text-notebook-dark mt-2">
                Production-ready device management, security controls, and content administration
              </p>
            </div>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 border-3 border-notebook-dark bg-white">
              <TabsTrigger value="users" className="font-handwritten text-lg">
                <Users className="w-5 h-5 mr-2" />
                User Management
              </TabsTrigger>
              <TabsTrigger value="devices" className="font-handwritten text-lg">
                <Smartphone className="w-5 h-5 mr-2" />
                Device Control
              </TabsTrigger>
              <TabsTrigger value="content" className="font-handwritten text-lg">
                <FileText className="w-5 h-5 mr-2" />
                Content Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card className="border-3 border-notebook-dark bg-white shadow-lg">
                <CardHeader className="bg-notebook-light border-b-3 border-notebook-dark">
                  <CardTitle className="font-heading text-4xl text-notebook-dark">User Accounts</CardTitle>
                  <CardDescription className="font-handwritten text-lg text-notebook-dark">
                    Manage user accounts, payment status, and session control
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {usersLoading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-notebook-dark border-t-transparent"></div>
                      <p className="mt-4 font-handwritten text-lg text-notebook-dark">Loading users...</p>
                    </div>
                  ) : users && users.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b-2 border-notebook-dark">
                            <TableHead className="font-handwritten text-lg text-notebook-dark">Email</TableHead>
                            <TableHead className="font-handwritten text-lg text-notebook-dark">Payment</TableHead>
                            <TableHead className="font-handwritten text-lg text-notebook-dark">Expiry Date</TableHead>
                            <TableHead className="font-handwritten text-lg text-notebook-dark">Last Login</TableHead>
                            <TableHead className="font-handwritten text-lg text-notebook-dark">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map(([principal, profile]) => (
                            <TableRow key={principal.toString()} className="border-b border-notebook-dark/30">
                              <TableCell className="font-handwritten text-base">{profile.email}</TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-handwritten text-sm font-bold ${
                                    profile.isPaid
                                      ? 'bg-green-100 text-green-800 border-2 border-green-600'
                                      : 'bg-red-100 text-red-800 border-2 border-red-600'
                                  }`}
                                >
                                  {profile.isPaid ? (
                                    <>
                                      <CheckCircle className="w-4 h-4" />
                                      Paid
                                    </>
                                  ) : (
                                    <>
                                      <AlertTriangle className="w-4 h-4" />
                                      Unpaid
                                    </>
                                  )}
                                </span>
                              </TableCell>
                              <TableCell className="font-handwritten text-base">
                                {formatDate(profile.expiryDate)}
                              </TableCell>
                              <TableCell className="font-handwritten text-sm text-gray-600">
                                {formatDateTime(profile.lastLogin)}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleTogglePaymentStatus(principal.toString(), profile.isPaid)}
                                    className="font-handwritten border-2 border-notebook-dark hover:bg-notebook-light"
                                  >
                                    Toggle Payment
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleRevokeSession(principal.toString())}
                                    className="font-handwritten bg-red-600 hover:bg-red-700"
                                  >
                                    Revoke Session
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="font-handwritten text-lg text-notebook-dark">No users found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices">
              <div className="space-y-6">
                <Card className="border-3 border-notebook-dark bg-white shadow-lg">
                  <CardHeader className="bg-notebook-light border-b-3 border-notebook-dark">
                    <CardTitle className="font-heading text-4xl text-notebook-dark flex items-center gap-3">
                      <Smartphone className="w-10 h-10" />
                      Device Binding Management
                    </CardTitle>
                    <CardDescription className="font-handwritten text-lg text-notebook-dark">
                      Reset device bindings to allow users to login from new devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {users && users.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-b-2 border-notebook-dark">
                              <TableHead className="font-handwritten text-lg text-notebook-dark">Email</TableHead>
                              <TableHead className="font-handwritten text-lg text-notebook-dark">Device ID</TableHead>
                              <TableHead className="font-handwritten text-lg text-notebook-dark">Last Login</TableHead>
                              <TableHead className="font-handwritten text-lg text-notebook-dark">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {users.map(([principal, profile]) => (
                              <TableRow key={principal.toString()} className="border-b border-notebook-dark/30">
                                <TableCell className="font-handwritten text-base">{profile.email}</TableCell>
                                <TableCell className="font-handwritten text-sm">
                                  {profile.primaryDeviceID ? (
                                    <span className="bg-notebook-accent px-3 py-1 rounded border-2 border-notebook-dark font-mono">
                                      {profile.primaryDeviceID.substring(0, 16)}...
                                    </span>
                                  ) : (
                                    <span className="text-gray-400 italic">Not set</span>
                                  )}
                                </TableCell>
                                <TableCell className="font-handwritten text-sm">
                                  {formatDateTime(profile.lastLogin)}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleResetDevice(principal.toString())}
                                    disabled={!profile.primaryDeviceID}
                                    className="font-handwritten border-2 border-notebook-dark hover:bg-notebook-accent disabled:opacity-50"
                                  >
                                    <Smartphone className="w-4 h-4 mr-2" />
                                    Reset Device
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Smartphone className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="font-handwritten text-lg text-notebook-dark">No users found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-3 border-notebook-dark bg-white shadow-lg">
                  <CardHeader className="bg-notebook-light border-b-3 border-notebook-dark">
                    <CardTitle className="font-heading text-4xl text-notebook-dark flex items-center gap-3">
                      <Clock className="w-10 h-10" />
                      Account Expiry Management
                    </CardTitle>
                    <CardDescription className="font-handwritten text-lg text-notebook-dark">
                      Set account expiration dates (default: March 2026)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="userSelect" className="font-handwritten text-lg text-notebook-dark">
                          Select User
                        </Label>
                        <select
                          id="userSelect"
                          value={selectedUserForExpiry}
                          onChange={(e) => setSelectedUserForExpiry(e.target.value)}
                          className="w-full font-handwritten text-lg border-3 border-notebook-dark rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-notebook-medium"
                        >
                          <option value="">-- Select a user --</option>
                          {users?.map(([principal, profile]) => (
                            <option key={principal.toString()} value={principal.toString()}>
                              {profile.email}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="font-handwritten text-lg text-notebook-dark">
                          Expiry Date (YYYY-MM)
                        </Label>
                        <Input
                          id="expiryDate"
                          type="month"
                          value={expiryDateInput}
                          onChange={(e) => setExpiryDateInput(e.target.value)}
                          className="font-handwritten text-lg border-3 border-notebook-dark py-6"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleSetExpiryDate}
                      disabled={!selectedUserForExpiry}
                      className="font-handwritten text-lg px-8 py-6 bg-notebook-dark hover:bg-notebook-medium text-white border-3 border-notebook-dark disabled:opacity-50"
                    >
                      <Clock className="w-5 h-5 mr-2" />
                      Set Expiry Date
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-3 border-notebook-dark bg-white shadow-lg">
                  <CardHeader className="bg-red-50 border-b-3 border-notebook-dark">
                    <CardTitle className="font-heading text-4xl text-notebook-dark flex items-center gap-3">
                      <Ban className="w-10 h-10 text-red-600" />
                      Active Sessions Monitor
                    </CardTitle>
                    <CardDescription className="font-handwritten text-lg text-notebook-dark">
                      Monitor and instantly revoke active user sessions for security enforcement
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {activeSessions && activeSessions.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-b-2 border-notebook-dark">
                              <TableHead className="font-handwritten text-lg text-notebook-dark">Email</TableHead>
                              <TableHead className="font-handwritten text-lg text-notebook-dark">Last Login</TableHead>
                              <TableHead className="font-handwritten text-lg text-notebook-dark">Device ID</TableHead>
                              <TableHead className="font-handwritten text-lg text-notebook-dark">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {activeSessions.map(([principal, profile]) => (
                              <TableRow key={principal.toString()} className="border-b border-notebook-dark/30">
                                <TableCell className="font-handwritten text-base">{profile.email}</TableCell>
                                <TableCell className="font-handwritten text-sm">
                                  {formatDateTime(profile.lastLogin)}
                                </TableCell>
                                <TableCell className="font-handwritten text-sm">
                                  {profile.primaryDeviceID ? (
                                    <span className="bg-notebook-accent px-3 py-1 rounded border-2 border-notebook-dark font-mono">
                                      {profile.primaryDeviceID.substring(0, 16)}...
                                    </span>
                                  ) : (
                                    <span className="text-gray-400 italic">Not set</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleRevokeAccess(principal.toString())}
                                    className="font-handwritten bg-red-600 hover:bg-red-700 border-2 border-red-800"
                                  >
                                    <Ban className="w-4 h-4 mr-2" />
                                    Revoke Access Instantly
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Ban className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="font-handwritten text-lg text-notebook-dark">No active sessions found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content">
              <div className="space-y-6">
                <Card className="border-3 border-notebook-dark bg-white shadow-lg">
                  <CardHeader className="bg-notebook-light border-b-3 border-notebook-dark">
                    <CardTitle className="font-heading text-4xl text-notebook-dark">Add New Module</CardTitle>
                    <CardDescription className="font-handwritten text-lg text-notebook-dark">
                      Upload PDF, images, or other content files for secure delivery to students
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="moduleTitle" className="font-handwritten text-lg text-notebook-dark">
                        Module Title
                      </Label>
                      <Input
                        id="moduleTitle"
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                        placeholder="e.g., Drilling Engineering Basics"
                        className="font-handwritten text-lg border-3 border-notebook-dark py-6"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="moduleDescription" className="font-handwritten text-lg text-notebook-dark">
                        Module Description
                      </Label>
                      <Input
                        id="moduleDescription"
                        value={newModuleDescription}
                        onChange={(e) => setNewModuleDescription(e.target.value)}
                        placeholder="Brief description of the module"
                        className="font-handwritten text-lg border-3 border-notebook-dark py-6"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fileUpload" className="font-handwritten text-lg text-notebook-dark">
                        Upload Files (PDF, Images, Documents)
                      </Label>
                      <Input
                        id="fileUpload"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileUpload}
                        disabled={uploadingFiles}
                        className="font-handwritten text-lg border-3 border-notebook-dark py-6"
                      />
                    </div>
                    {uploadingFiles && (
                      <div className="flex items-center gap-3 p-4 bg-notebook-accent border-2 border-notebook-dark rounded-lg">
                        <div className="animate-spin rounded-full h-6 w-6 border-3 border-notebook-dark border-t-transparent"></div>
                        <p className="font-handwritten text-lg text-notebook-dark">Uploading and securing files...</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-3 border-notebook-dark bg-white shadow-lg">
                  <CardHeader className="bg-notebook-light border-b-3 border-notebook-dark">
                    <CardTitle className="font-heading text-4xl text-notebook-dark">Existing Modules</CardTitle>
                    <CardDescription className="font-handwritten text-lg text-notebook-dark">
                      Manage uploaded content modules and secure delivery
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {modules && modules.length > 0 ? (
                      <div className="space-y-4">
                        {modules.map((module) => (
                          <div
                            key={module.id}
                            className="flex items-center justify-between p-6 border-3 border-notebook-dark rounded-lg bg-notebook-light hover:bg-notebook-accent transition-colors"
                          >
                            <div className="flex-1">
                              <h3 className="font-heading text-3xl text-notebook-dark mb-1">{module.title}</h3>
                              <p className="font-handwritten text-base text-notebook-dark mb-2">{module.description}</p>
                              <p className="font-handwritten text-sm text-gray-600">
                                📁 {module.content.length} file(s) • Secure delivery enabled
                              </p>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteModule(module.id)}
                              className="font-handwritten bg-red-600 hover:bg-red-700 border-2 border-red-800"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="font-handwritten text-lg text-notebook-dark">No modules found</p>
                        <p className="font-handwritten text-base text-gray-600 mt-2">
                          Upload your first module to get started
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
