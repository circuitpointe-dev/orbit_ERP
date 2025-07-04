
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, Mail, Edit, Type } from "lucide-react";
import { FieldSelectionCard } from "./review-step/FieldSelectionCard";
import { DocumentCanvas } from "./review-step/DocumentCanvas";
import { PropertyCard } from "./review-step/PropertyCard";

interface Field {
  id: string;
  name: string;
  type: "signer" | "signature" | "name" | "date" | "email" | "text";
  icon: React.ReactNode;
}

interface Document {
  id: string;
  fileName: string;
  category: string;
  fileSize: string;
  addedTime: string;
  owner: {
    name: string;
    avatar: string;
  };
  tags: Array<{
    name: string;
    bgColor: string;
    textColor: string;
  }>;
}

interface UploadedFile {
  file: File;
  id: string;
}

interface ReviewAndSendStepProps {
  onBack: () => void;
  onSend: () => void;
  selectedDocument?: Document | null;
  uploadedFile?: UploadedFile | null;
}

export const ReviewAndSendStep = ({
  onBack,
  onSend,
  selectedDocument,
  uploadedFile,
}: ReviewAndSendStepProps) => {
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [activeTab, setActiveTab] = useState("fields");

  // Create blob URL for the document
  const documentUrl = useMemo(() => {
    if (uploadedFile) {
      // For uploaded files, create a blob URL from the actual file
      console.log("Creating blob URL for uploaded file:", uploadedFile.file.name);
      return URL.createObjectURL(uploadedFile.file);
    } else if (selectedDocument) {
      // For selected documents, we would need the actual file data
      // For now, creating a placeholder - in a real app, you'd fetch the document content
      console.log("Selected document:", selectedDocument.fileName);
      // Return null to let DocumentCanvas handle its own upload
      return null;
    }
    return null;
  }, [uploadedFile, selectedDocument]);

  // Clean up blob URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (documentUrl && uploadedFile) {
        URL.revokeObjectURL(documentUrl);
      }
    };
  }, [documentUrl, uploadedFile]);

  const fieldTypes: Field[] = [
    {
      id: "signer",
      name: "Signer",
      type: "signer",
      icon: <User className="w-4 h-4" />,
    },
    {
      id: "signature",
      name: "Signature",
      type: "signature",
      icon: <Edit className="w-4 h-4" />,
    },
    {
      id: "name",
      name: "Full Name",
      type: "name",
      icon: <User className="w-4 h-4" />,
    },
    {
      id: "date",
      name: "Date Signed",
      type: "date",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "email",
      name: "Email",
      type: "email",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      id: "text",
      name: "Text",
      type: "text",
      icon: <Type className="w-4 h-4" />,
    },
  ];

  return (
    <div className="max-w-full mx-auto space-y-4">
      <Card className="rounded-[5px] shadow-none border-none">
        <CardContent className="p-4">
          {/* Three Column Layout - Adjusted widths */}
          <div className="grid grid-cols-12 gap-3 h-[500px] mb-4">
            {/* Selection Column - Reduced from 3 to 2 */}
            <div className="col-span-3">
              <FieldSelectionCard
                fieldTypes={fieldTypes}
                selectedField={selectedField}
                onFieldSelect={setSelectedField}
              />
            </div>

            {/* Signing Column (Canvas) - Increased from 6 to 8 */}
            <div className="col-span-6">
              <DocumentCanvas fileUrl={documentUrl || undefined} />
            </div>

            {/* Properties Column - Reduced from 3 to 2 */}
            <div className="col-span-3">
              <PropertyCard 
                selectedField={selectedField}
                onBack={onBack}
                onContinue={onSend}
                documentCount={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons - Moved outside the cards */}
      <div className="flex items-center justify-center gap-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-2 px-4 py-2 h-auto border border-gray-300 rounded-[5px] text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>

        <Button
          onClick={onSend}
          className="gap-2 px-6 py-2 h-auto rounded-[5px] text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white"
        >
          Send For Signature
        </Button>
      </div>
    </div>
  );
};
