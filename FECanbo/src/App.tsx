import { useEffect } from "react";
import { AdRequest } from "./types";

const data: AdRequest[] = [
  {
    requestId: "1",
    panoContent: "Quảng cáo",
    panoTitle: "Quảng cáo trà sữa Phúc Long",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    bookingAgency: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    panoDetailedContent:
      "Trà sữa Phúc Long không đặc biệt và hơi mắc nhưng uống cũng được",
    rentalPeriod: "12/11/2022 - 12/11/2024",
    status: "Đang xử lý",
    image: "",
  },
  {
    requestId: "2",
    panoContent: "Quảng cáo",
    panoTitle: "Quảng cáo trà sữa Phúc Long",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    bookingAgency: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    panoDetailedContent:
      "Trà sữa Phúc Long không đặc biệt và hơi mắc nhưng uống cũng được",
    rentalPeriod: "12/11/2022 - 12/11/2024",
    status: "Đã phê duyệt",
    image: "",
  },
  {
    requestId: "3",
    panoContent: "Quảng cáo",
    panoTitle: "Quảng cáo trà sữa Phúc Long",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    bookingAgency: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    panoDetailedContent:
      "Trà sữa Phúc Long không đặc biệt và hơi mắc nhưng uống cũng được",
    rentalPeriod: "12/11/2022 - 12/11/2024",
    status: "Đã hủy",
    image: "",
  },
];

const App = () => {
  return (
    <div>
      Hello everyone!!
    </div>
  );
};

export default function () {
  useEffect(() => {
    const head = document.querySelector("head");
    if (!head) {
      return;
    }
    const tailWindStyleTag = [...head.querySelectorAll("style")].find((style) =>
      style.innerHTML.includes("tailwind"),
    );
    if (tailWindStyleTag) {
      head.insertAdjacentElement("afterbegin", tailWindStyleTag);
    }
  }, []);
  return <App />;
}
