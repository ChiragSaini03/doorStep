def CNN(X_train, y_train, X_test, y_test, epoc=10, output=10):
    import tensorflow as tf
    from tensorflow import keras
    from keras import Sequential
    from keras.layers import Dense, Flatten, Dropout, Activation, Conv2D, MaxPooling2D
    from sklearn.metrics import accuracy_score
    import matplotlib.pyplot as plt
    import numpy as np

    model = Sequential()

    # 1st convolutional Layer
    model.add(Conv2D(128, (3, 3), input_shape=X_train.shape[1:], padding="SAME"))
    model.add(Activation("relu"))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    # 2st convolutional Layer
    model.add(Conv2D(96, (3, 3), padding="SAME"))
    model.add(Activation("relu"))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    # 3st convolutional Layer
    model.add(Conv2D(70, (3, 3), padding="SAME"))
    model.add(Activation("relu"))
    model.add(Dropout(0.1))


    # Fully Connected Layer
    model.add(Flatten())
    model.add(Dense(64, activation="relu"))
    model.add(Dropout(0.25))
    model.add(Dense(32, activation="relu"))
    model.add(Dense(output, activation="softmax"))

    print(model.summary())
    print(len(X_train))

    model.compile(
        optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"]
    )

    history = model.fit(
        X_train, y_train, epochs=epoc, shuffle="True", validation_split=0.2
    )

    result = model.evaluate(X_test, y_test, batch_size=10)

    print("test Loss : ", result[0], " , Test Accuracy : ", result[1])

    return model


