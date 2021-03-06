import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Recipe } from '../classes/recipe';
import { User } from '../classes/user';


export class FileUpload {

    key: string;
    name: string;
    url: string;
    file: File;

    constructor(file: File) {
        this.file = file;
    }
}


@Injectable()
export class UploadService {

    private basePath = '/uploads';
    private userRef: AngularFirestoreCollection<User>;

    private recipeRef: AngularFirestoreCollection<Recipe>;

    constructor(private db: AngularFirestore) {
        this.userRef = db.collection('users');
        this.recipeRef = db.collection('recipes');
    }

    pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }, type: string, data: any) {
        const storageRef = firebase.storage().ref();
        if (type === 'user') {
            this.basePath = '/userPics';
        } else  if (type === 'newRecipe' || type == 'updateRecipe') {
            this.basePath = '/recipePics';
        }
        const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
            // in progress
            const snap = snapshot as firebase.storage.UploadTaskSnapshot;
            // progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
            // fail
            console.log(error);
        },
        () => {
            // success
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            data.picture = fileUpload.url;
            if (type === 'user') {
                this.savePicToUser(data);
            } else if (type === 'newRecipe') {
                this.saveRecipe(data);
            } else if (type === 'updateRecipe') {
                this.updateRecipe(data);
            }
            });
        }
        );
  }

  private updateRecipe(data: Recipe) {
      this.recipeRef.doc(data.id.toString()).ref.update({
        picture: data.picture,
        ingredients: data.ingredients,
        instructions: data.instructions,
        title: data.title,
        type: data.type,
        meal: data.meal,
        time: data.time,
        tags: data.tags
      });
  }

  private saveRecipe(data: Recipe) {
      const id = data.id;
      const userId = localStorage.getItem('userId');
      this.recipeRef.doc(id.toString()).ref.get()
                        .then(doc => {
                                // This recipe doesn't exist!
                                if (!doc.exists) {
                                    // Need to store the recipe
                                    // Store it in cloud firestore
                                    this.recipeRef.doc(id.toString()).set(Object.assign({}, data));
                                    // console.log(userId);
                                    this.userRef.doc(userId).ref.get()
                                        .then(docSnap => {
                                            if (docSnap.exists) {
                                                // tslint:disable-next-line:prefer-const
                                                let userRecipes = docSnap.data().recipes;
                                                userRecipes.push(id.toString());
                                                this.userRef.doc(userId).update({
                                                    recipes: userRecipes
                                                });
                                            } else {
                                                console.error('Error updating user picture');
                                            }
                                        });
                                    return true;
                                } else {
                                    // This deletes the old recipe and adds it again. It shouldn't reach this point, but if it does it should work
                                    this.recipeRef.doc(id.toString()).delete().then(function() {
                                         this.recipeRef.doc(id.toString()).set(Object.assign({}, data));
                                    }).catch(function(error) {
                                        console.error('Error removing document: ', error);
                                    });
                                    return false;
                                }

                        });
  }

  private savePicToUser(data: User) {
      const id = data.id;
      this.userRef.doc(id.toString()).ref.get()
                      .then(doc => {
                          if (doc.exists) {
                              this.userRef.doc(id.toString()).update({
                                  picture: data.picture
                              });
                          } else {
                              console.error('Error updating user picture');
                          }
                      });

  }


}







