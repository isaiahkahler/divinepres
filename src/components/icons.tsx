import * as React from 'react';

export function PlusIcon(props: { onClick?: any }) {
  return (
    <svg className="icon" x="0px" y="0px" viewBox="0 0 100 100" onClick={props.onClick}>
      <rect x="0" y="0" width="100" height="100" />
      <rect x="5" y="5" width="90" height="90" fill="#fff" />
      <rect x="45" y="10" width="10" height="80" />
      <rect x="10" y="45" width="80" height="10" />
    </svg>
  );
}

export function BackIcon(props: { onClick?: any }) {
  return (
    <svg className="icon" width="100" height="100" viewBox="0 0 100 100" onClick={props.onClick}>
      <rect x="0" y="0" width="100" height="100" />
      <rect x="5" y="5" width="90" height="90" fill="#fff" />
      <polygon points="10,50 50,10 57,17 23,50 57,83 50,90" />
      <rect x="15" y="45" height="10" width="75" />
    </svg>
  );
}

export function CloseIcon(props: { onClick?: any }) {
  return (
    <svg className="icon" width="100" height="100" viewBox="0 0 100 100" onClick={props.onClick}>
      <rect x="0" y="0" width="100" height="100" />
      <rect x="5" y="5" width="90" height="90" fill="#fff" />
      <polygon points="10,15 15,10 90,85 85,90" />
      <polygon points="90,15 85,10 10,85 15,90" />
    </svg>
  );
}

export function EditIcon(props: { onClick?: any }) {
  return (
    <svg className="icon" width="100" height="100" viewBox="0 0 100 100" onClick={props.onClick}>
      <rect x="0" y="0" width="100" height="100" />
      <rect x="5" y="5" width="90" height="90" fill="#fff" />
      <polygon points='80,10 90,20 80,30 70,20'/>
      <polygon points='65,25 75,35 25,85 15,85 15,75'/>
    </svg>
  );
}
