import FreelancerPage from "@/components/freelancer/FreelancerPage";
import { freelancerPages } from "@/lib/freelancer";

export default function HireFreelancerPage() {
  return (
    <FreelancerPage {...freelancerPages.hire} />
  );
}
