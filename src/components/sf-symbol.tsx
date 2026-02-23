import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import type { ImageStyle } from "expo-image";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const SF_MAP: Record<string, IoniconName> = {
  xmark: "close",
  "person.2": "people",
  gearshape: "settings",
  "square.and.arrow.up": "share-social",
  "chevron.right": "chevron-forward",
  "arrow.right": "arrow-forward",
  globe: "globe-outline",
  map: "map-outline",
  airplane: "airplane",
};

type Props = {
  source: string;
  style?: ImageStyle & { tintColor?: any; fontSize?: number };
};

export function SFSymbol({ source, style }: Props) {
  const name = source.startsWith("sf:") ? source.slice(3) : source;

  if (process.env.EXPO_OS !== "web") {
    return <Image source={source} style={style} />;
  }

  const ionName = SF_MAP[name];
  if (!ionName) return null;

  const { width, height, fontSize, tintColor, ...restStyle } = (style ?? {}) as any;
  const size = width ?? height ?? fontSize ?? 20;
  const color = tintColor ?? "inherit";

  return <Ionicons name={ionName} size={size} color={color} style={restStyle} />;
}
