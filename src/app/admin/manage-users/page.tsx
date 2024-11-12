"use client"

import { useEffect, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Pencil, Trash2, Search, UserPlus, Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { getUsers } from "../../../../data/user"
import { updateUserInformations } from "../../../../data/updateUser"
import { deleteUser } from "../../../../data/deleteUser"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { RegisterSchema } from "../../../../schemas"
import { infer, z } from "zod"
import { Register } from "@/action/register"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

type User = {
  id: number
  name: string
  email: string
  role: string
}

const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "USER" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "ADMIN" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "SUPPORT" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "USER" },
]

const roles = ["USER", "ADMIN","SUPPORT" ,"MODERATOR"]

export default function ManageExistingUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newUser, setNewUser] = useState<Omit<User, "id">>({ name: "", email: "", role: "USER" })

  useEffect(()=>{
    const fetch = async () => {
      const res = await getUsers()
      setUsers(res)
    }
    fetch()
  },[])

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsEditDialogOpen(true)
  }

  const handleUpdateUser = async (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setIsEditDialogOpen(false)
    setEditingUser(null)
    const res = await updateUserInformations(updatedUser)
    console.log(res);
    // console.log(res);
    
    toast({
      title: "User updated",
      description: `${updatedUser.name}'s information has been updated.`,
    })
  }

  const handleDeleteUser = async (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))
    const res = await deleteUser(userId)
   if(res.success){
    toast({
      title: "User deleted",
      description: "The user has been removed from the system.",
      variant: "destructive",
    })
   }
    
  }
  const [isPending,startTransition] = useTransition()
  const [error,SetError] = useState<string | undefined>("")
  const [sucess,SetSucess] = useState<string | undefined>("")
  const [seePassword,SetseePassword] = useState<boolean>(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver : zodResolver(RegisterSchema),
      defaultValues : {
          email : "",
          password : "",
          username : "",
          name : "",
      }
  })

  const OnSubmit = (values : z.infer<typeof RegisterSchema>) => {

      SetError("")
      SetSucess("")

     startTransition(()=>{
          Register(values)
          .then((data) => {
              SetError(data.error);
              SetSucess(data.sucess)
              const name = data?.user?.name ? data.user.name.toString() : "";
              const email = data?.user?.email ? data.user.email.toString() : "";

              if(data.sucess){
                setNewUser({ 
                  ...newUser,
                  name,
                  email, 
                  role: "USER" 
                });
                const newUserId = Math.max(...users.map((user) => user.id)) + 1;
                const createdUser = { name, email, role: "USER", id: newUserId };
                
                setUsers([...users, createdUser]);
                setIsCreateDialogOpen(false);
                
                toast({
                  title: "User created",
                  description: `${createdUser.name} has been added to the system.`,
                });
               
              }
          })
     })

  }
 
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-card rounded-lg mt-6 p-4 max-w-4xl mx-auto h-fit shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Manage Existing Users</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEditUser(user)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdateUser(editingUser)
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Update User</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <Form {...form}>
                <form 
                 onSubmit={form.handleSubmit(OnSubmit)}
                 className='space-y-6'
                 >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name='name'
                            render={({field}) => (
                                <FormItem>
                                      <FormLabel>Nome</FormLabel>
                                      <FormControl>
                                        <Input {...field} 
                                        placeholder='Seu nome' 
                                        type='name'
                                        />
                                      </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input {...field} 
                                          placeholder='example@example.com' 
                                          type='email'
                                        />
                                      </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='username'
                            render={({field}) => (
                                <FormItem>
                                      <FormLabel>Username</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder='username' type='text'/>
                                      </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name='password'
                        render={({field}) => (
                            <FormItem>
                              <FormLabel>Senha</FormLabel>
                              <div className='flex relative'>
                                <FormControl>
                                  <Input {...field} placeholder='********' type={seePassword ? 'text' : 'password'}/>
                                </FormControl>
                                <FormControl>
                                  <Button className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost" type="button" onClick={()=>SetseePassword(!seePassword)}>
                                      {seePassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                  </Button>
                                </FormControl>
                              </div>
                            </FormItem>
                        )}
                        />
                    </div>   
                    <Button 
                    type='submit'
                    className='w-full'
                    disabled={isPending}
                    >{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Registrar'}</Button>
                </form>
           </Form>
        </DialogContent>
      </Dialog>
    </main>
  )
}