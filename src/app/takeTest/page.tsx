import { MOCK_TEST } from "@/features/TakeTest/mockData";
import TakeTest from "@/features/TakeTest/ui/TakeTest";

const TakeTestPage = () => {
    return (
        <TakeTest test={MOCK_TEST} />
    );
};

export default TakeTestPage;