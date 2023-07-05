import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGal/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import styles from './App.module.css'

const API_KEY = '36709978-7836bf9f35f408a7db18834e6';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    page: 1,
    selectedImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const url = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    axios
      .get(url)
      .then((response) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleFormSubmit = (query) => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  handleImageClick = (imageURL) => {
    this.setState({ selectedImageURL: imageURL });
  };

  handleCloseModal = () => {
    this.setState({ selectedImageURL: '' });
  }

  render() {
    const { images, isLoading, selectedImageURL } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery images={images} onImageClick={this.handleImageClick} />

        {isLoading && <Loader />}

        {images.length > 0 && !isLoading && <Button onClick={this.fetchImages} />}

        {selectedImageURL && (
          <Modal imageURL={selectedImageURL} onCloseModal={this.handleCloseModal} />
        )}
      </div>
    );
  }
}