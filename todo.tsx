// const Username = () => {
//   const { loading, error, data } = useQuery(gql`
//     {
//       me {
//         username
//       }
//     }
//   `);

//   if (loading) return <Text>Loading...</Text>;
//   if (error) return (
//     <Text>Error! ${error.message}</Text>
//   );
//   if (!data || !data.user) return (
//     <Text>Could not find user :(</Text>
//   );

//   return (
//     <Text>Your username: {data.me.username}</Text>
//   );
// }

import React, { useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import Cards from "./card";

interface PostInterface {
  id: any;
  title: any;
  body: any;
}
interface DataInterference {
  // id: int;
  title: string;
  body: string;
}
interface NewDataInterference {
  title: string;
}
interface PostData {
  posts: PostInterface[];
}

// interface NewPostDetails {
//   title: string;
//   body: string;
// }

// mutation UpdateTodo($id: String!, $type: String!) {
//     updateTodo(id: $id, type: $type) {
//       id
//       type
//     }
//   }  ;

// const muatation = gql`
//   ${myQuery}
// `;
// const mutation = gql`
//   ${myQuery}
// `;

export default function Todo() {
  const [postData, onChangePostData] = React.useState([]);
  const [value, onChangeText] = React.useState("");

  const ADD_POST = gql`
    mutation MyMutation($title: String!, $body: String!) {
      insert_posts(objects: { title: $title, body: $body }) {
        returning {
          id
          title
          body
        }
      }
    }
  `;

  const [addPost, { error, data }] = useMutation(ADD_POST);

  if (data) console.log(data);
  if (error) console.log(error);
  //  const { loading, data, error } = useQuery<PostData >(GET_POST)

  //   let ADD_POST = `mutation MyMutation($body:String!, $title:String!) {
  //   insert_posts_one(object: {body: $body, title: $title}) {
  //     id
  //   }
  // }`;

  // console.log(data, "REFETChed");
  // if(data) console.log(data)
  // if(error) console.log(error)
  const addPosts = () => {
    // const [addPost, { data, error }] = useMutation(query);
    // addPost({
    //   variables: { text },
    //   refetchQueries: [{ query: GET_TODOS }],
    // });
  };
  const GET_POST = gql`
    query MyQuery {
      posts(limit: 10) {
        body
        id
        title
      }
    }
  `;
  const getData = new Promise((resolve, reject) => {
    const { loading, data, error } = useQuery<PostData>(GET_POST);

    if (error) reject(error);
    if ((data as any) && (data as any).posts[0]) {
      console.log(data, "DATA");
      resolve((data as any).posts);
    }
  });

  useEffect(() => {
    getData
      .then((d: any) => onChangePostData(d))
      .catch((e: any) => console.log(e));
  }, [getData]);

  let array = [
    {
      id: 1,
      title: "Card Title",
      body: "Card Body",
    },
    {
      id: 2,
      title: "Card Title",
      body: "Card Body",
    },
    {
      id: 3,
      title: "Card Title",
      body: "Card Body",
    },
    {
      id: 11,
      title: "Card Title",
      body: "Card Body",
    },
    {
      id: 12,
      title: "Card Title",
      body: "Card Body",
    },
    {
      id: 13,
      title: "Card Title",
      body: "Card Body",
    },
  ];

  const Card = (e: { title: string; body: string; id: number }) => (
    <Cards id={e.id} title={e.title} body={e.body} />
  );
  const renderCard = (d: {
    item: { title: string; id: number; body: string };
  }) => {
    console.log(d, "INTERFACE");
    return <Card title={d.item.title} id={d.item.id} body={d.item.body} />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MyPosts</Text>
      </View>

      <SafeAreaView style={styles.cardsArea}>
        <FlatList
          style={{ width: "90%" }}
          data={postData}
          renderItem={renderCard as any}
          keyExtractor={(item: any) => item.id}
        />
      </SafeAreaView>

      <View style={styles.addPost}>
        <View style={{ marginTop: 20, display: "flex", alignItems: "center" }}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeText(text)}
            placeholder="Add Posts"
            value={value}
          />
        </View>
        <View style={styles.saveBtnArea}>
          <View style={styles.savePostBtn}>
            <Button
              onPress={(e) =>
                addPost({
                  variables: { title: value, body: "" },
                  refetchQueries: [{ query: GET_POST }],
                })
              }
              title="Save"
              color="#8488F0"
              accessibilityLabel="Save"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100vw",
    height: "100vh",
  },
  header: {
    width: "100%",
    height: "10%",
    backgroundColor: "#C8EBC5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
  },
  input: {
    // position: 'absolute',
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 18,
    paddingLeft: 10,

    width: "70%",
    height: "46px",
    backgroundColor: "rgba(173, 218, 215, 0.6)",

    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,

    borderRadius: 8,
  },
  saveBtnArea: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  savePostBtn: {
    // padding:'5px 10px',
    width: "30%",

    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  addPost: {
    bottom: 0,
    // top:0
  },

  cardsArea: {
    width: "100%",
    height: "70%",
    overflow: "scroll",

    // bottom: "10",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
