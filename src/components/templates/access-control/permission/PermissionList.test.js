import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import PermissionList from './PermissionList';
import AccessControlService from '../../../../services/access.control.service';

jest.mock('../../../../services/access.control.service');

test('Button Rendering', async () => {
  // given
  const resp = {
    data: {
      result: [
        {
          id: 3,
          type: 'user-define',
          typeName: '사용자정의',
          name: 'ACCESS_STOCK',
          description: '재고 접근 권한',
        },
      ],
      totalCount: 1,
    },
  };
  AccessControlService.getPermissions.mockResolvedValue(resp);

  const routes = [
    {
      path: '/access-control/permissions',
      element: <PermissionList/>,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/', '/access-control/permissions'],
    initialIndex: 1,
  });

  // when
  render(<RouterProvider router={router}/>);
  await waitFor(() => screen.getByTestId('permission-table'));

  // then
  const permissionTable = screen.getByTestId('permission-table');
  expect(permissionTable).toBeInTheDocument();
  expect(permissionTable).toHaveTextContent('재고 접근 권한');
});
