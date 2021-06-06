let UPDATE_POST = `
mutation MyMutation($id:Number!,$body:String!, $title:String!) {
  update_posts_by_pk(pk_columns: {id: $id}, _set: {body: $body, title: $title}) {
    id
  }
}`;

let DELETE_POST = `
mutation MyMutation($id:Number!) {
  delete_posts_by_pk(id: $id) {
    id
  }
}
`;

let ADD_POST = `mutation MyMutation($body:String!, $title:String!) {
  insert_posts_one(object: {body: $body, title: $title}) {
    id
  }
}`;
let FETCH_POST = ` query MyQuery {
  posts {
    body
    id
    title
   }
}`;

export { UPDATE_POST, DELETE_POST, ADD_POST, FETCH_POST };
