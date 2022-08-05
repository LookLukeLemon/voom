import { Switch } from '@headlessui/react';
import { classNames } from 'utils';

const ToggleButton = ({
  enabled,
  enabledDisplay,
  disabledDisplay,
  onChange,
}: {
  enabled: boolean;
  enabledDisplay: string;
  disabledDisplay: string;
  onChange: (enabled: boolean) => void;
}) => {
  return (
    <Switch
      checked={enabled}
      onChange={(isEnabled) => {
        onChange(isEnabled);
      }}
      className="relative flex h-12 w-full cursor-pointer items-center rounded-xl bg-voom_base_secondary text-xs font-semibold transition-colors duration-200 ease-in-out focus:outline-none"
    >
      <span className="sr-only">toggle</span>
      <div className="flex w-full gap-x-8 text-zinc-500">
        <span className={classNames('flex-1', !enabled && 'invisible')}>
          {enabledDisplay}
        </span>
        <span className={classNames('flex-1', enabled && 'invisible')}>
          {disabledDisplay}
        </span>
      </div>

      <div
        aria-hidden="true"
        className={`${
          enabled ? ' translate-x-full -ml-1' : 'translate-x-0 ml-1'
        } pointer-events-none absolute  flex h-10 w-1/2 transform items-center justify-center rounded-xl bg-voom_base_third text-white  transition duration-200 ease-in-out`}
      >
        {enabled ? (
          <span>{disabledDisplay}</span>
        ) : (
          <span>{enabledDisplay}</span>
        )}
      </div>
    </Switch>
  );
};

export default ToggleButton;
