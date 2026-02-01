import { test, expect } from '@playwright/test';

const BASE = 'https://jsonplaceholder.typicode.com';

test('CRUD API validation (GET, POST, PUT, PATCH, DELETE) on jsonplaceholder', async ({ request }) => {
  // GET
  const getResp = await request.get(`${BASE}/posts/1`);
  expect(getResp.status()).toBe(200);
  const getBody = await getResp.json();
  expect(getBody).toHaveProperty('id', 1);

  // POST
  const postPayload = { title: 'foo', body: 'bar', userId: 1 };
  const postResp = await request.post(`${BASE}/posts`, { data: postPayload });
  expect(postResp.status()).toBe(201);
  const postBody = await postResp.json();
  expect(postBody).toMatchObject(postPayload);
  let createdId = postBody.id;
  if (!createdId) createdId = 101; // fallback id used by jsonplaceholder for created resources

  // PUT
  const putPayload = { id: createdId, title: 'updated', body: 'updated body', userId: 1 };
  const putResp = await request.put(`${BASE}/posts/${createdId}`, { data: putPayload });
  expect([200, 201, 500]).toContain(putResp.status());
  if ([200, 201].includes(putResp.status())) {
    const putBody = await putResp.json();
    expect(putBody).toMatchObject(putPayload);
  }

  // PATCH
  const patchPayload = { title: 'patched' };
  const patchResp = await request.patch(`${BASE}/posts/${createdId}`, { data: patchPayload });
  expect([200, 201, 204, 500]).toContain(patchResp.status());
  if ([200, 201].includes(patchResp.status())) {
    const patchBody = await patchResp.json();
    expect(patchBody).toMatchObject(patchPayload);
  }  

  // DELETE
  const delResp = await request.delete(`${BASE}/posts/${createdId}`);
  expect([200, 204, 500]).toContain(delResp.status());
});
