import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Car } from '@shared/schema';

interface VehicleFiltersProps {
  cars: Car[];
  onFilterChange: (filteredCars: Car[]) => void;
}

const VehicleFilters = ({ cars, onFilterChange }: VehicleFiltersProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Extract unique types and brands from cars
  const types = Array.from(new Set(cars.map(car => car.type)));
  const brands = Array.from(new Set(cars.map(car => car.brand)));

  // Find min and max price
  const minPrice = Math.min(...cars.map(car => car.price));
  const maxPrice = Math.max(...cars.map(car => car.price));

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      onFilterChange(cars);
      return;
    }
    
    const filtered = cars.filter(car => car.type === filter);
    onFilterChange(filtered);
  };

  const applyFilters = () => {
    let filtered = [...cars];
    
    // Filter by types if any selected
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(car => selectedTypes.includes(car.type));
    }
    
    // Filter by brands if any selected
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(car => selectedBrands.includes(car.brand));
    }
    
    // Filter by price range
    filtered = filtered.filter(
      car => car.price >= priceRange[0] && car.price <= priceRange[1]
    );
    
    onFilterChange(filtered);
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
    setActiveFilter('all');
    onFilterChange(cars);
  };

  return (
    <>
      {/* Quick filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          onClick={() => handleFilterClick('all')}
          className={activeFilter === 'all' ? 'bg-[#0F172A]' : ''}
        >
          All
        </Button>
        {types.map(type => (
          <Button
            key={type}
            variant={activeFilter === type ? 'default' : 'outline'}
            onClick={() => handleFilterClick(type)}
            className={activeFilter === type ? 'bg-[#0F172A]' : ''}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Advanced filters */}
      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="advanced-filters">
          <AccordionTrigger>Advanced Filters</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              {/* Vehicle Types */}
              <div>
                <h3 className="font-medium mb-2">Vehicle Type</h3>
                <div className="space-y-2">
                  {types.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`type-${type}`} 
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={(checked) => 
                          handleTypeChange(type, checked as boolean)
                        }
                      />
                      <Label htmlFor={`type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-medium mb-2">Brand</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`brand-${brand}`} 
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => 
                          handleBrandChange(brand, checked as boolean)
                        }
                      />
                      <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-2">Price Range (₹/day)</h3>
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  value={priceRange}
                  min={minPrice}
                  max={maxPrice}
                  step={10}
                  onValueChange={handlePriceChange}
                  className="mt-6"
                />
                <div className="flex justify-between mt-2">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
                <Button className="bg-[#0F172A]" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default VehicleFilters;
