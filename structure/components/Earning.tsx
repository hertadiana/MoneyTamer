// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// interface EarningProps{
//     text: any;
//     onDelete: any;
// }

// interface EarningItem {
//     id: string;
//     type: string;
//     sum: number;
//     date: string;
//     mentions: string;
//   }
// const Earning = (props: EarningProps) => {
//     return (
//         <View>
//             <View>
//                 <Text>{props.text}</Text>
//             </View>
//             <TouchableOpacity onPress={props.onDelete}>
//                 <Text>Delete</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }
// export default Earning
export interface Earning {
    id: string;
    type: string;
    sum: number;
    date: string;
    mentions: string;
  }
  