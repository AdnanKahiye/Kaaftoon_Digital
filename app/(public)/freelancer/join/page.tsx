import FreelancerPage from "@/components/freelancer/FreelancerPage";
import { freelancerPages } from "@/lib/freelancer"

export default function JoinFreelancerPage() {
  return (
    <FreelancerPage {...freelancerPages.join} />
  );
}
