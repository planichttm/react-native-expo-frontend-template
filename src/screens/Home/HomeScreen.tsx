// src/screens/Home/HomeScreen.tsx
import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Card, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../context/AuthContext';
import { homeStyles } from '../../styles/screens/home.styles';
import { system } from '../../styles/system';

// Feature card component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  color, 
  onPress 
}) => (
  <Card containerStyle={homeStyles.card}>
    <View style={homeStyles.iconContainer}>
      <Icon name={icon} size={48} color={color} />
    </View>
    <Card.Title style={homeStyles.cardTitle}>{title}</Card.Title>
    <Card.Divider />
    <Text style={homeStyles.cardDescription}>{description}</Text>
    <TouchableOpacity
      style={[homeStyles.cardButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={homeStyles.buttonText}>Explore</Text>
    </TouchableOpacity>
  </Card>
);

const HomeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <ScrollView style={homeStyles.container}>
      <View style={homeStyles.content}>
        <Text style={homeStyles.welcomeTitle}>
          {user ? `Welcome back, ${user.email?.split('@')[0] || 'User'}!` : 'Welcome to Our App!'}
        </Text>
        
        <Text style={homeStyles.welcomeDescription}>
          Explore our features and discover what our app has to offer.
        </Text>
        
        {/* Main Feature Card */}
        <View style={homeStyles.mainCard}>
          <Text style={homeStyles.mainCardTitle}>Your Analytics Hub</Text>
          <View style={system.divider} />
          <Text style={homeStyles.mainCardDescription}>
            Track and analyze data with our powerful visualization tools.
            Get insights into performance metrics and market trends across
            the ecosystem.
          </Text>
        </View>
        
        {/* Feature cards in a row */}
        <View style={homeStyles.cardRow}>
          <FeatureCard
            title="Analytics"
            description="Track your performance with detailed analytics and insights."
            icon="chart-line"
            color="#38bdf8"
            onPress={() => navigation.navigate('UserProfile' as never)}
          />
          
          <FeatureCard
            title="Dashboard"
            description="View your personalized dashboard with all your important data."
            icon="view-dashboard"
            color="#10b981"
            onPress={() => navigation.navigate('UserProfile' as never)}
          />
          
          <FeatureCard
            title="Settings"
            description="Customize your app experience with personal preferences."
            icon="cog"
            color="#f59e0b"
            onPress={() => navigation.navigate('UserProfile' as never)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;