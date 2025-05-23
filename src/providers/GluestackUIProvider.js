import { GluestackUIProvider } from '@gluestack-ui/nativewind-utils';
import config from './config';

export default function Provider({ children }) {
  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
}