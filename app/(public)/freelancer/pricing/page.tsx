import FreelancerPage from "@/components/freelancer/FreelancerPage";
import { freelancerPages } from "@/lib/freelancer";

export default function PricingPage() {
  return (
    <FreelancerPage {...freelancerPages.pricing} />
  );
}
