import React, { forwardRef, memo } from 'react';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import { mapValues } from './utils/object';

type StylerConfig<Config> = {
  [Property in Extract<keyof Config, string>]: StylerConfig<Config[Property]>;
};

type ExtractStylerProps<Config, ComponentConfig> = {
  [Property in Extract<
    keyof Config,
    ComponentConfig extends Array<keyof Config> ? ComponentConfig[number] : never
  >]?: keyof Config[Property];
};

type InferComponentProps<Component extends React.ElementType> = Component extends React.ElementType<
  infer ActualComponentProps
>
  ? ActualComponentProps
  : React.ComponentProps<Component>;

export default function createStyler<AppConfig>(
  appConfig: AppConfig extends StylerConfig<AppConfig> ? AppConfig : never
) {
  function styler<
    Component extends React.ElementType,
    ComponentProps extends InferComponentProps<Component>,
    ComponentConfig extends Array<keyof AppConfig>,
    StylerProps extends ExtractStylerProps<AppConfig, ComponentConfig>
  >(component: Component, componentConfig: ComponentConfig) {
    function EnhancedComponent(
      props: ComponentProps & StylerProps,
      ref: React.ForwardedRef<Component>
    ): JSX.Element {
      const componentProps = omit(props, componentConfig);
      const stylerProps = pick(props, componentConfig);
      const transformedStylerProps = mapValues(stylerProps, (value, key) => {
        return appConfig[key][value];
      });
      return React.createElement(component, { ref, ...componentProps, ...transformedStylerProps });
    }
    return memo(forwardRef(EnhancedComponent));
  }
  return styler;
}
