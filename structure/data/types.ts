import { ActualAmount } from "../components/ActualAmount"; // Adjust path as needed
import { Budget } from "../components/Budget";
import { Earning } from "../components/Earning";
import { MonthlyCheck } from "../components/MonthlyCheck";
import { RegrettedPurchase } from "../components/RegrettedPurchase";
export type RootStackParamList = {
  Home: undefined;
  Earnings: undefined;
  EditEarning: {
    earning: Earning;
    updateEarning: (updatedEarning: Earning) => void;
  };
  ActualAmount: undefined;
  EditActualAmount: {
    actualAmounts: ActualAmount;
    updateActualAmount: (updatedActualAmount: ActualAmount) => void;
  };
  Budget: undefined;
  EditBudget: {
    budget: Budget;
    updateBudget: (updatedBudget: Budget) => void;
  };
  MonthlyChecks: undefined;
  EditMonthlyCheck: {
    monthlyCheck: MonthlyCheck;
    updateMonthlyCheck: (updatedMonthlyCheck: MonthlyCheck) => void;
  };
  Regretted: undefined;
  EditRegrettedPurchase: {
    regrettedPurchase: RegrettedPurchase;
    updateRegrettedPurchase: (updatedRegrettedPurchase: RegrettedPurchase) => void;
  };
};
