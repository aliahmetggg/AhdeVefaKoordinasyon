import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface Family {
  name: string;
  memberCount: number;
  address: string;
  photos: string[];
}

interface FamilyDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  familyData: Family | null;
  onAddPhoto: () => void;
}

export const FamilyDetailModal = ({ isVisible, onClose, familyData, onAddPhoto }: FamilyDetailModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
    >
      <BlurView intensity={80} style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>✕</Text>
          </TouchableOpacity>
          
          <Text style={styles.title}>{familyData?.name || 'Aile Bilgileri'}</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Üye Sayısı:</Text>
            <Text>{familyData?.memberCount || '-'}</Text>
            
            <Text style={styles.label}>Adres:</Text>
            <Text>{familyData?.address || '-'}</Text>
          </View>

          <View style={styles.photosContainer}>
            <Text style={styles.label}>Fotoğraflar:</Text>
            <View style={styles.photoGrid}>
              {familyData?.photos?.map((photo, index) => (
                <Image 
                  key={index}
                  source={{ uri: photo }}
                  style={styles.photo}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.addPhotoButton} onPress={onAddPhoto}>
            <Text style={styles.buttonText}>Fotoğraf Ekle</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  photosContainer: {
    marginBottom: 20,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addPhotoButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
