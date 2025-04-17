
import { useState } from "react";
import { Search, Filter, Clock, CheckCircle2, XCircle, Film, CheckCheck, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const RequestItem = ({ title, year, status, requestDate, poster, requester }: any) => {
  return (
    <Card className="cosmic-card overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="h-16 w-12 rounded overflow-hidden flex-shrink-0">
            {poster ? (
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${poster})` }}
              />
            ) : (
              <div className="h-full w-full bg-cosmic-pink/10 flex items-center justify-center">
                <Film className="text-cosmic-pink" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-xs text-muted-foreground">{year}</p>
              </div>
              <Badge className={
                status === "approved" ? "bg-green-500/20 text-green-500 border-green-500/30" :
                status === "denied" ? "bg-red-500/20 text-red-500 border-red-500/30" :
                "bg-cosmic-pink/20 text-cosmic-pink border-cosmic-pink/30"
              }>
                {status === "approved" ? "Approved" : 
                 status === "denied" ? "Denied" : 
                 "Pending"}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Requested {requestDate} by {requester}</span>
              </div>
              
              {status === "pending" && (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-7 text-green-500 hover:text-green-600 hover:bg-green-500/10">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-red-500 hover:text-red-600 hover:bg-red-500/10">
                    <XCircle className="h-3 w-3 mr-1" />
                    Deny
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RequestForm = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cosmic-gradient">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="cosmic-card sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request a Movie</DialogTitle>
          <DialogDescription>
            Submit a request for a movie you'd like to add to the library.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Movie Title</Label>
            <Input
              id="title"
              placeholder="Enter movie title..."
              className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Release Year (optional)</Label>
            <Input
              id="year"
              placeholder="e.g. 2023"
              className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information to help find the movie..."
              className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="cosmic-gradient" onClick={() => setOpen(false)}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Requests = () => {
  // Mock data for requests
  const pendingRequests = [
    { 
      id: 1, 
      title: "Cosmic Journey: The Last Frontier", 
      year: 2023, 
      status: "pending", 
      requestDate: "2 days ago",
      requester: "you"
    },
    { 
      id: 2, 
      title: "Stellar Odyssey 2", 
      year: 2024, 
      status: "pending", 
      requestDate: "1 week ago",
      requester: "admin"
    },
    { 
      id: 3, 
      title: "Neon Nova: Rebirth", 
      year: 2022, 
      status: "pending", 
      requestDate: "2 weeks ago",
      requester: "you"
    },
  ];
  
  const completedRequests = [
    { 
      id: 4, 
      title: "Pink Nebula", 
      year: 2024, 
      status: "approved", 
      requestDate: "1 month ago",
      poster: "https://images.unsplash.com/photo-1581321825660-e7b4ea58a61c?w=300&h=450&fit=crop",
      requester: "you"
    },
    { 
      id: 5, 
      title: "Stardust Dreams", 
      year: 2022, 
      status: "approved", 
      requestDate: "2 months ago",
      poster: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=300&h=450&fit=crop",
      requester: "admin"
    },
    { 
      id: 6, 
      title: "Astral Echoes", 
      year: 2023, 
      status: "denied", 
      requestDate: "3 months ago",
      requester: "you",
      reason: "Already in library under different name"
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-cosmic-pink">Movie</span> Requests
        </h1>
        <RequestForm />
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search requests..."
            className="pl-8 bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="bg-cosmic-pink/5 border border-cosmic-pink/20">
          <TabsTrigger 
            value="pending" 
            className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white"
          >
            Pending ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white"
          >
            Completed ({completedRequests.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-4">
          {pendingRequests.length === 0 ? (
            <div className="cosmic-card p-8 text-center">
              <CheckCheck className="h-16 w-16 mx-auto mb-4 text-cosmic-pink/30" />
              <h2 className="text-xl font-medium mb-2">No pending requests</h2>
              <p className="text-muted-foreground mb-4">All movie requests have been processed</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <RequestItem key={request.id} {...request} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          {completedRequests.length === 0 ? (
            <div className="cosmic-card p-8 text-center">
              <CheckCheck className="h-16 w-16 mx-auto mb-4 text-cosmic-pink/30" />
              <h2 className="text-xl font-medium mb-2">No completed requests</h2>
              <p className="text-muted-foreground mb-4">Requests that are approved or denied will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedRequests.map((request) => (
                <RequestItem key={request.id} {...request} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="cosmic-card p-6">
        <h2 className="text-xl font-bold mb-4">Request Guidelines</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-cosmic-pink flex-shrink-0 mt-0.5" />
            <span>Include the full movie title and year if possible</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-cosmic-pink flex-shrink-0 mt-0.5" />
            <span>Check the library first to make sure it's not already available</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-cosmic-pink flex-shrink-0 mt-0.5" />
            <span>For TV shows, specify the seasons you're requesting</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-cosmic-pink flex-shrink-0 mt-0.5" />
            <span>Please be patient - requests are processed in the order received</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Requests;
