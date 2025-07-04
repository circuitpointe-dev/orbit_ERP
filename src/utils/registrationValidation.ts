
import { RegistrationData } from "@/components/auth/RegistrationForm";

export const validateStep1 = (formData: RegistrationData) => {
  const { organizationName, contactPersonName, contactEmail, contactPhone, password} = formData;
  
  const errors: string[] = [];

  if (!organizationName || !contactPersonName || !contactEmail || !contactPhone || !password) {
    errors.push("Please fill in all required fields");
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateStep2 = (formData: RegistrationData) => {
  const errors: string[] = [];

  if (formData.selectedModules.length === 0) {
    errors.push("Please select at least one ERP module");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
