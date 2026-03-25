import { useState, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Crop, Search, X, ZoomIn, Image as ImageIcon, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RegionMatch {
  id: string;
  imageName: string;
  matchScore: number;
  thumbnail: string;
  regionDescription: string;
  timestamp: string;
}

export function RegionImageSearch() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropRegion, setCropRegion] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<RegionMatch[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock image for demonstration
  const demoImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop";

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setCropRegion(null);
      setSearchResults([]);
    }
  };

  // Simulate region selection
  const handleSelectRegion = () => {
    // In a real app, this would use canvas drawing to select region
    setCropRegion({ x: 100, y: 100, width: 200, height: 150 });
  };

  // Search for similar regions
  const handleSearchRegion = () => {
    if (!cropRegion) return;

    setIsSearching(true);

    // Simulate search
    setTimeout(() => {
      const mockResults: RegionMatch[] = [
        {
          id: "R-001",
          imageName: "Surveillance_Location_B.jpg",
          matchScore: 0.94,
          thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
          regionDescription: "Similar infrastructure pattern detected in different location",
          timestamp: "2024-10-12 14:20"
        },
        {
          id: "R-002",
          imageName: "Satellite_Imagery_Sector_5.jpg",
          matchScore: 0.88,
          thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
          regionDescription: "Matching structural elements in satellite view",
          timestamp: "2024-10-10 09:15"
        },
        {
          id: "R-003",
          imageName: "Field_Report_Image_3.jpg",
          matchScore: 0.82,
          thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
          regionDescription: "Similar visual patterns identified in field reconnaissance",
          timestamp: "2024-10-08 16:45"
        },
        {
          id: "R-004",
          imageName: "Archive_Photo_2023_Q4.jpg",
          matchScore: 0.76,
          thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
          regionDescription: "Historical match showing similar features from previous year",
          timestamp: "2023-12-15 11:30"
        }
      ];

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const clearSelection = () => {
    setCropRegion(null);
    setSearchResults([]);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Crop className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4>Region-Based Image Search</h4>
            <p className="text-sm text-muted-foreground">
              Find similar images by cropping and matching specific regions
            </p>
          </div>
        </div>
      </Card>

      {/* Upload Section */}
      <Card className="p-6">
        <div className="space-y-4">
          {!selectedImage ? (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="mb-2">Upload Image for Region Search</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Upload an image to select and search for similar regions
              </p>
              <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
                <ImageIcon className="w-4 h-4" />
                Select Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage(demoImage)}
                  className="gap-2"
                >
                  <ZoomIn className="w-4 h-4" />
                  Use Demo Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Display */}
              <div className="relative">
                <div className="border border-border rounded-lg overflow-hidden bg-muted/30">
                  <ImageWithFallback
                    src={selectedImage}
                    alt="Selected image"
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                  {cropRegion && (
                    <div
                      className="absolute border-2 border-primary bg-primary/10"
                      style={{
                        left: `${cropRegion.x}px`,
                        top: `${cropRegion.y}px`,
                        width: `${cropRegion.width}px`,
                        height: `${cropRegion.height}px`,
                      }}
                    >
                      <div className="absolute -top-6 left-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Selected Region
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <Button
                  onClick={handleSelectRegion}
                  disabled={!!cropRegion}
                  variant="outline"
                  className="gap-2"
                >
                  <Crop className="w-4 h-4" />
                  Select Region
                </Button>
                {cropRegion && (
                  <>
                    <Button
                      onClick={handleSearchRegion}
                      disabled={isSearching}
                      className="gap-2"
                    >
                      {isSearching ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          Search Similar Regions
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={clearSelection}
                      variant="outline"
                      className="gap-2"
                    >
                      <X className="w-4 h-4" />
                      Clear Selection
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => {
                    setSelectedImage(null);
                    setCropRegion(null);
                    setSearchResults([]);
                  }}
                  variant="ghost"
                  className="gap-2 ml-auto"
                >
                  <X className="w-4 h-4" />
                  Remove Image
                </Button>
              </div>

              {/* Info Alert */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  In production: Draw a rectangle on the image to select the region you want to search for. 
                  The AI will find similar visual patterns across all images in the database.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4>Similar Regions Found</h4>
              <Badge variant="secondary">
                {searchResults.length} matches
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((result) => (
                <Card key={result.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={result.thumbnail}
                        alt={result.imageName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500">
                          {Math.round(result.matchScore * 100)}% match
                        </Badge>
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <h4 className="text-sm mb-1 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        {result.imageName}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {result.regionDescription}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {result.timestamp}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <ZoomIn className="w-3 h-3" />
                        View Full
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
