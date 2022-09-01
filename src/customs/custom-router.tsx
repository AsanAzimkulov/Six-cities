import { useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import { useState } from 'react';
const CustomRouter = (props: any) => {
  const { history, ...restProps } = props;
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...restProps}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export default CustomRouter;
