import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { User } from '@shared/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, MoreHorizontal, Shield, User as UserIcon, UserX, UserCog, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const UserManagement = () => {
  const { toast } = useToast();
  const [userToManage, setUserToManage] = useState<User | null>(null);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch all users
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<User> }) => {
      const response = await apiRequest('PUT', `/api/users/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      toast({
        title: "User Updated",
        description: "User information has been successfully updated.",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAdminAction = (user: User, action: string) => {
    setUserToManage(user);
    setConfirmAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setUserToManage(null);
    setConfirmAction(null);
    setDialogOpen(false);
  };

  const confirmAdminAction = () => {
    if (!userToManage || !confirmAction) return;
    
    switch (confirmAction) {
      case 'makeAdmin':
        updateUserMutation.mutate({
          id: userToManage.id,
          data: { isAdmin: true }
        });
        break;
      case 'removeAdmin':
        updateUserMutation.mutate({
          id: userToManage.id,
          data: { isAdmin: false }
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#0F172A] font-playfair">User Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-64" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>
                          {user.firstName ? `${user.firstName} ${user.lastName || ''}` : '-'}
                        </TableCell>
                        <TableCell>{user.email || '-'}</TableCell>
                        <TableCell>
                          {user.isAdmin ? (
                            <Badge className="bg-blue-600">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          ) : (
                            <Badge variant="outline">User</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem 
                                className="cursor-pointer flex items-center"
                                onClick={() => {
                                  toast({
                                    title: "View Profile",
                                    description: `Viewing profile of ${user.username}`,
                                  });
                                }}
                              >
                                <UserIcon className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer flex items-center"
                                onClick={() => {
                                  if (user.email) {
                                    window.open(`mailto:${user.email}`, '_blank');
                                  } else {
                                    toast({
                                      title: "No Email",
                                      description: "This user doesn't have an email address.",
                                      variant: "destructive"
                                    });
                                  }
                                }}
                              >
                                <Mail className="h-4 w-4 mr-2" />
                                Contact User
                              </DropdownMenuItem>
                              {!user.isAdmin ? (
                                <DropdownMenuItem 
                                  className="cursor-pointer flex items-center text-blue-600"
                                  onClick={() => handleAdminAction(user, 'makeAdmin')}
                                >
                                  <Shield className="h-4 w-4 mr-2" />
                                  Make Admin
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem 
                                  className="cursor-pointer flex items-center text-orange-600"
                                  onClick={() => handleAdminAction(user, 'removeAdmin')}
                                >
                                  <UserX className="h-4 w-4 mr-2" />
                                  Remove Admin
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction === 'makeAdmin' 
                ? "Grant Admin Privileges" 
                : confirmAction === 'removeAdmin'
                ? "Remove Admin Privileges"
                : "Confirm Action"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction === 'makeAdmin' && userToManage && (
                <>Are you sure you want to make <strong>{userToManage.username}</strong> an admin? This will grant them full access to the admin dashboard and all management functions.</>
              )}
              {confirmAction === 'removeAdmin' && userToManage && (
                <>Are you sure you want to remove admin privileges from <strong>{userToManage.username}</strong>? They will no longer have access to the admin dashboard.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmAdminAction}
              className={confirmAction === 'makeAdmin' ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-600 hover:bg-orange-700"}
            >
              {updateUserMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : confirmAction === 'makeAdmin' ? (
                "Make Admin"
              ) : (
                "Remove Admin"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;