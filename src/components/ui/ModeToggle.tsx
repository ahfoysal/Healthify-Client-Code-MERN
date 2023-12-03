import { Switch } from '@nextui-org/react';

import { useTheme } from '@/hooks/ThemeProviderContext';
import Moon from '@/assets/icons/MoonIcon';
import Sun from '@/assets/icons/SunIcon';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <Switch
        defaultSelected={theme == 'dark' ? true : false}
        size="lg"
        onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
        color="secondary"
        startContent={<Sun />}
        endContent={<Moon />}
      ></Switch>
    </div>
  );
}
