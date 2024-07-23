import  { useState } from "react";
import { useAuth } from "../../context/UserProvider";
import { api } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit } from "lucide-react";

interface EditReviewProps {
  _id: string;
  content: string;
  user: {
    _id: string;
    username: string;
  };
  onReviewUpdate: (id: string, newContent: string) => void;
}

function EditReview({ _id, content, user, onReviewUpdate }: EditReviewProps) {
  const { loggedInUser } = useAuth();
  const [editedContent, setEditedContent] = useState(content);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = async () => {
    try {
      const response = await api.patch(`business/reviews/${_id}`, {
        content: editedContent,
      });
      if (response.status === 200) {
        onReviewUpdate(_id, editedContent);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to edit review:", error);
    }
  };

  if (loggedInUser?._id !== user._id) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Review</SheetTitle>
          <SheetDescription>
            Make changes to your review here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Edit your review..."
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={handleEdit}>Save changes</Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default EditReview;