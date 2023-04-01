import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import PermissionList from './PermissionList';
import AccessControlService from '../../../../services/access.control.service';

jest.mock('../../../../services/access.control.service');

test('테이블 렌더링', async () => {
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

  // https://reactrouter.com/en/main/routers/create-memory-router
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

  // 테이블 헤더 검증
  const header = permissionTable.querySelector('thead > tr');
  const headerColumns = header.querySelectorAll('th');
  expect(headerColumns).toHaveLength(4);
  expect(headerColumns[0]).toHaveTextContent('유형');
  expect(headerColumns[1]).toHaveTextContent('권한 이름');
  expect(headerColumns[2]).toHaveTextContent('설명');
  expect(headerColumns[3]).toHaveTextContent('Action');

  // 테이블 바디 검증
  const bodyRows = permissionTable.querySelectorAll('tbody > tr');
  expect(bodyRows).toHaveLength(1);
  const bodyRowColumns = bodyRows[0].querySelectorAll('td');
  expect(bodyRowColumns).toHaveLength(4);
  expect(bodyRowColumns[0]).toHaveTextContent('사용자정의');
  expect(bodyRowColumns[1]).toHaveTextContent('ACCESS_STOCK');
  expect(bodyRowColumns[2]).toHaveTextContent('재고 접근 권한');
});


// describe('테이블 랜더링', () => {
//   test('url parameter 가 없을 때 기본적으로 1페이지 10개를 렌더링 한다.', async () => {
//
//   });
//
//   test('url parameter에 page 2와 size 2를 명기한 경우에 2페이지와 2개씩 렌다링 한다.', async () => {
//
//   });
//
//   test('권한 유형이 사용자 정의일 때 Action 버튼이 노출 한다.', async () => {
//
//   });
//
//   test('권한 유형이 사전 정의일 때 Action 버튼이 노출하지 않는다.', async () => {
//
//   });
// });
//
// describe('페이지 Action', () => {
//   test('권한 생성 버튼을 누르면 권한 생성 페이지로 이동한다.', async () => {
//
//   });
//
//   test('테이블에 권한 수정 버튼을 누르면 수정 페이지로 이동한다.', async () => {
//
//   });
//
//   test('테이블에 권한 삭제 버튼을 누르면 삭제 확인 창을 띄우고 삭제 한다.', async () => {
//
//   });
// });
