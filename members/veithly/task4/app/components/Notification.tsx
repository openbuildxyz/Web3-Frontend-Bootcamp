'use client';
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Info } from 'lucide-react';

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

interface NotificationProps {
  type?: NotificationType;
  message: string;
  duration?: number;
  onClose: () => void;
}

const NotificationIcon: React.FC<{ type: NotificationType }> = ({ type }) => {
  switch (type) {
    case NotificationType.SUCCESS:
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case NotificationType.ERROR:
      return <XCircle className="w-5 h-5 text-red-500" />;
    case NotificationType.INFO:
    default:
      return <Info className="w-5 h-5 text-blue-500" />;
  }
};

export const Notification: React.FC<NotificationProps> = ({
  type = NotificationType.INFO,
  message,
  duration = 2000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 w-64 p-4 rounded-md shadow-lg transition-all duration-300 ease-in-out ${
      type === NotificationType.SUCCESS ? 'bg-green-100' :
      type === NotificationType.ERROR ? 'bg-red-100' :
      'bg-blue-100'
    }`} style={{ zIndex: 9999 }}>
      <div className="flex items-center">
        <NotificationIcon type={type} />
        <span className="ml-2 text-sm font-medium">{message}</span>
        <button onClick={handleClose} className="ml-auto">
          <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
  duration: number;
}

export interface NotificationContextValue {
  addNotification: (type: NotificationType, message: string, duration?: number) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext = React.createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = (type: NotificationType, message: string, duration: number = 4500) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message, duration }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      {notifications.map(({ id, type, message, duration }) => (
        <Notification
          key={id}
          type={type}
          message={message}
          duration={duration}
          onClose={() => removeNotification(id)}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
