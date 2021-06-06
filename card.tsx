import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { gql, useQuery, useMutation } from "@apollo/client";

export default function Card(props: any) {
  const [title, onchangeTitle] = React.useState(props.title ? props.title : "");
  const [body, onchangeBody] = React.useState(props.body ? props.body : "");
  const [modalVisible, setModalVisible] = React.useState(false);
  //  mutation UpdateTodo($id: String!, $type: String!) {
  //     updateTodo(id: $id, type: $type) {
  //       id
  //       type
  //     }
  //   }  ;
  const GET_POSTS = gql`
    query MyQuery {
      posts(limit: 10) {
        body
        id
        title
      }
    }
  `;
  const UPDATE_POST = gql`
    mutation MyMutation($id: Int, $title: String!, $body: String!) {
      update_posts(
        where: { id: { _eq: $id } }
        _set: { body: $body, title: $title }
      ) {
        returning {
          id
          title
          body
        }
      }
    }
  `;
  const DELETE_POST = gql`
    mutation ($id: Int) {
      delete_posts(where: { id: { _eq: $id } }) {
        returning {
          id
        }
      }
    }
  `;

  const [updatePost, { error: uploadError, data: uploadSucces }] =
    useMutation(UPDATE_POST);

  const [deletePost, { error: deleteError, data: deleteSucces }] =
    useMutation(DELETE_POST);

  if (uploadSucces) console.log("UPDATESUCCES");
  if (deleteSucces) console.log("Deleted", deleteSucces);
  if (deleteError || uploadError) console.log(deleteError, uploadError);

  return (
    <View>
      <View style={styles.card}>
        <View style={{ display: "flex" }}>
          <TextInput
            style={{ paddingLeft: 10, fontSize: 20 }}
            value={title}
            onChange={(e) => onchangeTitle((e as any).target.value)}
            //   onFocus={(e) => console.log("FOCUUS")}
            multiline
            numberOfLines={modalVisible ? 2 : 1}
            keyboardAppearance="light"
            allowFontScaling={true}
          />
          <TextInput
            style={{ paddingLeft: 10, fontSize: 12 }}
            value={body}
            onChange={(e) => onchangeBody((e as any).target.value)}
            //   onFocus={(e) => console.log("FOCUUS")}
            multiline
            numberOfLines={modalVisible ? 2 : 1}
            keyboardAppearance="light"
            allowFontScaling={true}
          />
        </View>
        <View>
          {modalVisible && (
            <Button
              title="save"
              onPress={(e) => {
                setModalVisible(!modalVisible),
                  updatePost({ variables: { id: props.id, title, body } });
              }}
            />
          )}
        </View>
        <View
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Entypo
            name="edit"
            size={24}
            color="black"
            onPress={(e) => setModalVisible(!modalVisible)}
          />
          <MaterialIcons
            name="delete-forever"
            size={34}
            color="black"
            onPress={(e) =>
              deletePost({
                variables: { id: props.id },
                refetchQueries: [{ query: GET_POSTS }],
              })
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: "25px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "80%",
    height: "100px",
    backgroundColor: "#EAE6E6",
    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
  },
});
