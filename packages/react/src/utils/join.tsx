import React, { Fragment } from 'react';

/**
 * Util for adding a separator element between react components excluding the last item
 */
export function join(arr: unknown[], node: React.ReactNode) {
  return arr.map((item, index) => (
    // @ts-expect-error this is fine
    <Fragment key={index}>
      {item}
      {index !== arr.length - 1 && node}
    </Fragment>
  ));
}
