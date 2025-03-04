
import { Text, View } from "@react-pdf/renderer";
import React, { PropsWithChildren } from "react";

export const Bold: React.FC<PropsWithChildren> = ({ children, ...props }) => (
  <Text
    style={{
      fontFamily: "Helvetica-Bold",
    }}
    {...props}
  >
    {children}
  </Text>
);

export const Block: React.FC<PropsWithChildren> = ({ children, ...props }) => (
  <View style={{ border: 1, borderColor: "grey", borderRadius: 10 }} {...props}>
    {children}
  </View>
);

export const Body: React.FC<PropsWithChildren> = ({ children, ...props }) => (
  <View style={{ padding: 10, gap: 10 }} {...props}>
    {children}
  </View>
);

export const Caption: React.FC<PropsWithChildren> = ({ children }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "lightgrey",
      padding: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    }}
  >
    {children}
  </View>
);
