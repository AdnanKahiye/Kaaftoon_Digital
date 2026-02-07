import FreelancerPage from "@/components/freelancer/FreelancerPage";
import { freelancerPages } from "@/lib/freelancer";

export default function HowItWorksPage() {
  return (
    <FreelancerPage {...freelancerPages["how-it-works"]} />
  );
}
