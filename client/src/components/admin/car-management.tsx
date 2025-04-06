import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Car, insertCarSchema } from '@shared/schema';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Pencil, Trash, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// Extended schema for form validation
const carFormSchema = z.object({
  name: z.string().min(3, {
    message: "Car name must be at least 3 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be at least 2 characters.",
  }),
  model: z.string().min(1, {
    message: "Model is required.",
  }),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 1),
  type: z.string(),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  horsepower: z.coerce.number().int().positive().optional(),
  seats: z.coerce.number().int().positive().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  image: z.string().url({
    message: "Please enter a valid URL.",
  }),
  description: z.string().optional(),
  availability: z.boolean().default(true),
});

type CarFormValues = z.infer<typeof carFormSchema>;

const CarManagement = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

  // Fetch all cars
  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
  });

  // Form setup
  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      type: 'Sports',
      price: 0,
      horsepower: 0,
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Premium',
      image: '',
      description: '',
      availability: true,
    },
  });

  // Create car mutation
  const createCarMutation = useMutation({
    mutationFn: async (data: CarFormValues) => {
      const response = await apiRequest('POST', '/api/cars', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cars'] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Car Created",
        description: "The car has been successfully added to the fleet.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create the car. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update car mutation
  const updateCarMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CarFormValues }) => {
      const response = await apiRequest('PUT', `/api/cars/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cars'] });
      setIsDialogOpen(false);
      setSelectedCar(null);
      setIsEditMode(false);
      form.reset();
      toast({
        title: "Car Updated",
        description: "The car details have been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update the car. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete car mutation
  const deleteCarMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/cars/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cars'] });
      setCarToDelete(null);
      setDeleteDialogOpen(false);
      toast({
        title: "Car Deleted",
        description: "The car has been successfully removed from the fleet.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete the car. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: CarFormValues) => {
    if (isEditMode && selectedCar) {
      updateCarMutation.mutate({ id: selectedCar.id, data: values });
    } else {
      createCarMutation.mutate(values);
    }
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setIsEditMode(true);
    
    // Populate form with car data
    form.reset({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      type: car.type,
      price: car.price,
      horsepower: car.horsepower || 0,
      seats: car.seats || 2,
      transmission: car.transmission || 'Automatic',
      fuelType: car.fuelType || 'Premium',
      image: car.image || '',
      description: car.description || '',
      availability: car.availability === null ? undefined : car.availability,
    });
    
    setIsDialogOpen(true);
  };

  const handleDeleteCar = (car: Car) => {
    setCarToDelete(car);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (carToDelete) {
      deleteCarMutation.mutate(carToDelete.id);
    }
  };

  const openAddDialog = () => {
    setIsEditMode(false);
    setSelectedCar(null);
    form.reset({
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      type: 'Sports',
      price: 0,
      horsepower: 0,
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Premium',
      image: '',
      description: '',
      availability: true,
    });
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#0F172A] font-playfair">Car Fleet Management</h2>
        <Button 
          className="bg-[#0F172A] hover:bg-[#1E293B]" 
          onClick={openAddDialog}
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Car
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Fleet</CardTitle>
          <CardDescription>Manage all vehicles in the LuxeRide fleet</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#0F172A]" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Price/Day</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cars && cars.length > 0 ? (
                    cars.map((car) => (
                      <TableRow key={car.id}>
                        <TableCell>{car.id}</TableCell>
                        <TableCell className="font-medium">{car.name}</TableCell>
                        <TableCell>{car.brand}</TableCell>
                        <TableCell>{car.type}</TableCell>
                        <TableCell>{car.year}</TableCell>
                        <TableCell>₹{car.price}</TableCell>
                        <TableCell>
                          {car.availability ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              No
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditCar(car)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteCar(car)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No cars found. Add a new car to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Car Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Car" : "Add New Car"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Update the car details in the system" 
                : "Fill in the details to add a new car to the fleet"
              }
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Porsche 911 Carrera" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Porsche" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 911 Carrera" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1900" 
                          max={new Date().getFullYear() + 1} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="SUV">SUV</SelectItem>
                          <SelectItem value="Luxury">Luxury</SelectItem>
                          <SelectItem value="Ultra-Luxury">Ultra-Luxury</SelectItem>
                          <SelectItem value="Grand Tourer">Grand Tourer</SelectItem>
                          <SelectItem value="Electric">Electric</SelectItem>
                          <SelectItem value="Convertible">Convertible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Day (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="horsepower"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horsepower</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="seats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seats</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="transmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transmission</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transmission" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Automatic">Automatic</SelectItem>
                          <SelectItem value="Manual">Manual</SelectItem>
                          <SelectItem value="Semi-Automatic">Semi-Automatic</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fuelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fuel Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Regular">Regular</SelectItem>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="Electric">Electric</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/car-image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a description of the car" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Available for Booking</FormLabel>
                      <p className="text-sm text-gray-500">
                        If checked, this car will be available for customers to book
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#0F172A] hover:bg-[#1E293B]"
                  disabled={createCarMutation.isPending || updateCarMutation.isPending}
                >
                  {(createCarMutation.isPending || updateCarMutation.isPending) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isEditMode ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    isEditMode ? "Update Car" : "Add Car"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the car "{carToDelete?.name}" from the system.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteCarMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CarManagement;
