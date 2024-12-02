import { Earning } from "../components/Earning"; // Adjust path as needed

export type RootStackParamList = {
  Home: undefined;
  Earnings: undefined;
  EditEarning: {
    earning: Earning;
    updateEarning: (updatedEarning: Earning) => void;
  };
  ActualAmount: undefined;
  Budget: undefined;
  MonthlyChecks: undefined;
  Regretted: undefined;
};
