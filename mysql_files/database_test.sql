-- phpMyAdmin SQL Dump
-- version 4.2.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 29, 2015 at 12:21 PM
-- Server version: 5.6.21
-- PHP Version: 5.5.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE IF NOT EXISTS `accounts` (
`user_id` int(11) unsigned NOT NULL,
  `user_name` varchar(32) DEFAULT NULL,
  `user_email` varchar(64) DEFAULT NULL,
  `password_hash` varchar(64) DEFAULT NULL,
  `password_salt` varchar(40) DEFAULT NULL,
  `user_root` int(10) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`user_id`, `user_name`, `user_email`, `password_hash`, `password_salt`, `user_root`) VALUES
(1, 'pedda23', '', '4bc52fce3322dc98061cf1a4fa717f58c5471d01f4b13f804ccaa769f31bf649', '5946bfa2d2acaf1a8ee4ddffcdf40bf241f452ff', NULL),
(37, 'Mustermann1234', NULL, NULL, NULL, 10),
(120, 'Admin', '', '04dc538a55e6b2638cd68c641c3b89ca77dd40f4e0142ee10961cb7f39066c14', 'c993c740b061e8a07cfdd76fa376747fe300db26', 1111);

-- --------------------------------------------------------

--
-- Table structure for table `answer_table`
--

CREATE TABLE IF NOT EXISTS `answer_table` (
`answer_id` int(11) unsigned NOT NULL,
  `voc_id` int(11) unsigned NOT NULL,
  `answer` text NOT NULL,
  `multi_choice` smallint(5) unsigned DEFAULT '0',
  `img_id` int(11) DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=961 DEFAULT CHARSET=latin1 COMMENT='multiple_answers';

--
-- Dumping data for table `answer_table`
--

INSERT INTO `answer_table` (`answer_id`, `voc_id`, `answer`, `multi_choice`, `img_id`) VALUES
(1, 1, '', 0, 0),
(2, 2, '', 0, 0),
(7, 10, 'ich', 0, 0),
(8, 10, 'du', 0, 0),
(9, 10, 'er', 0, 0),
(10, 11, 'one', 0, 0),
(11, 12, 'two', 0, 0),
(12, 13, 'three', 0, 0),
(13, 14, 'four', 0, 0),
(14, 15, 'five', 0, 0),
(355, 290, 'moin2', 0, 0),
(357, 291, 'moin1 ', 0, 0),
(358, 291, 'moin1 ', 0, 0),
(544, 450, 'moin2', 0, 0),
(545, 451, 'moin1 ', 0, 0),
(546, 451, 'moin1 ', 0, 0),
(547, 452, 'moin2', 0, 0),
(548, 453, 'moin1 ', 0, 0),
(549, 453, 'moin1 ', 0, 0),
(560, 461, 'moin2', 0, 0),
(561, 462, 'moin1 ', 0, 0),
(562, 462, 'moin1 ', 0, 0),
(613, 498, 'moin2', 0, 0),
(614, 499, 'moin1 ', 0, 0),
(615, 499, 'moin1 ', 0, 0),
(616, 500, 'ich', 0, 0),
(617, 500, 'du', 0, 0),
(618, 500, 'er', 0, 0),
(619, 501, 'one', 0, 0),
(620, 502, 'two', 0, 0),
(621, 503, 'three', 0, 0),
(622, 504, 'four', 0, 0),
(623, 505, 'five', 0, 0),
(626, 507, 'ich', 0, 0),
(627, 507, 'du', 0, 0),
(628, 507, 'er', 0, 0),
(629, 508, 'one', 0, 0),
(630, 509, 'two', 0, 0),
(631, 510, 'three', 0, 0),
(632, 511, 'four', 0, 0),
(633, 512, 'five', 0, 0),
(636, 514, 'ich', 0, 0),
(637, 514, 'du', 0, 0),
(638, 514, 'er', 0, 0),
(639, 515, 'one', 0, 0),
(640, 516, 'two', 0, 0),
(641, 517, 'three', 0, 0),
(642, 518, 'four', 0, 0),
(643, 519, 'five', 0, 0),
(646, 521, 'ich', 0, 0),
(647, 521, 'du', 0, 0),
(648, 521, 'er', 0, 0),
(649, 522, 'one', 0, 0),
(650, 523, 'two', 0, 0),
(651, 524, 'three', 0, 0),
(652, 525, 'four', 0, 0),
(653, 526, 'five', 0, 0),
(656, 528, 'ich', 0, 0),
(657, 528, 'du', 0, 0),
(658, 528, 'er', 0, 0),
(659, 529, 'one', 0, 0),
(660, 530, 'two', 0, 0),
(661, 531, 'three', 0, 0),
(662, 532, 'four', 0, 0),
(663, 533, 'five', 0, 0),
(666, 535, 'ich', 0, 0),
(667, 535, 'du', 0, 0),
(668, 535, 'er', 0, 0),
(669, 536, 'one', 0, 0),
(670, 537, 'two', 0, 0),
(671, 538, 'three', 0, 0),
(672, 539, 'four', 0, 0),
(673, 540, 'five', 0, 0),
(676, 542, 'ich', 0, 0),
(677, 542, 'du', 0, 0),
(678, 542, 'er', 0, 0),
(679, 543, 'one', 0, 0),
(680, 544, 'two', 0, 0),
(681, 545, 'three', 0, 0),
(682, 546, 'four', 0, 0),
(683, 547, 'five', 0, 0),
(696, 556, 'ich', 0, 0),
(697, 556, 'du', 0, 0),
(698, 556, 'er', 0, 0),
(699, 557, 'one', 0, 0),
(700, 558, 'two', 0, 0),
(701, 559, 'three', 0, 0),
(702, 560, 'four', 0, 0),
(703, 561, 'five', 0, 0),
(706, 563, 'ich', 0, 0),
(707, 563, 'du', 0, 0),
(708, 563, 'er', 0, 0),
(709, 564, 'one', 0, 0),
(710, 565, 'two', 0, 0),
(711, 566, 'three', 0, 0),
(712, 567, 'four', 0, 0),
(713, 568, 'five', 0, 0),
(716, 570, 'ich', 0, 0),
(717, 570, 'du', 0, 0),
(718, 570, 'er', 0, 0),
(719, 571, 'one', 0, 0),
(720, 572, 'two', 0, 0),
(721, 573, 'three', 0, 0),
(722, 574, 'four', 0, 0),
(723, 575, 'five', 0, 0),
(726, 577, 'ich', 0, 0),
(727, 577, 'du', 0, 0),
(728, 577, 'er', 0, 0),
(729, 578, 'one', 0, 0),
(730, 579, 'two', 0, 0),
(731, 580, 'three', 0, 0),
(732, 581, 'four', 0, 0),
(733, 582, 'five', 0, 0),
(736, 584, 'ich', 0, 0),
(737, 584, 'du', 0, 0),
(738, 584, 'er', 0, 0),
(739, 585, 'one', 0, 0),
(740, 586, 'two', 0, 0),
(741, 587, 'three', 0, 0),
(742, 588, 'four', 0, 0),
(743, 589, 'five', 0, 0),
(766, 605, 'moin2', 0, 0),
(767, 606, 'moin1 ', 0, 0),
(768, 606, 'moin1 ', 0, 0),
(769, 607, 'moin2', 0, 0),
(770, 608, 'moin1 ', 0, 0),
(771, 608, 'moin1 ', 0, 0),
(772, 609, 'moin2', 0, 0),
(773, 610, 'moin1 ', 0, 0),
(774, 610, 'moin1 ', 0, 0),
(775, 611, 'moin2', 0, 0),
(776, 612, 'moin1 ', 0, 0),
(777, 612, 'moin1 ', 0, 0),
(778, 613, 'moin2', 0, 0),
(779, 614, 'moin1 ', 0, 0),
(780, 614, 'moin1 ', 0, 0),
(781, 615, 'moin2', 0, 0),
(782, 616, 'moin1 ', 0, 0),
(783, 616, 'moin1 ', 0, 0),
(784, 617, 'moin2', 0, 0),
(785, 618, 'moin1 ', 0, 0),
(786, 618, 'moin1 ', 0, 0),
(787, 619, 'moin2', 0, 0),
(788, 620, 'moin1 ', 0, 0),
(789, 620, 'moin1 ', 0, 0),
(790, 621, 'moin2', 0, 0),
(791, 622, 'moin1 ', 0, 0),
(792, 622, 'moin1 ', 0, 0),
(793, 623, 'moin2', 0, 0),
(794, 624, 'moin1 ', 0, 0),
(795, 624, 'moin1 ', 0, 0),
(796, 625, 'moin2', 0, 0),
(797, 626, 'moin1 ', 0, 0),
(798, 626, 'moin1 ', 0, 0),
(799, 627, 'ja', 0, 0),
(800, 628, 'ja', 0, 0),
(801, 629, 'moin', 0, 0),
(802, 630, 'jo', 0, 0),
(803, 631, 'moin', 0, 0),
(804, 632, 'jo', 0, 0),
(805, 633, 'moin', 0, 0),
(806, 634, 'jo', 0, 0),
(807, 635, 'moin', 0, 0),
(808, 636, 'moin ', 0, 0),
(809, 636, 'jo', 0, 0),
(810, 637, 'moin', 0, 0),
(811, 638, 'moin ', 0, 0),
(812, 638, 'jo', 0, 0),
(813, 639, 'moin', 0, 0),
(814, 640, 'moin ', 0, 0),
(815, 640, 'jo', 0, 0),
(816, 641, 'moin', 0, 0),
(817, 642, 'moin ', 0, 0),
(818, 642, 'jo', 0, 0),
(819, 643, 'moin', 0, 0),
(820, 644, 'moin ', 0, 0),
(821, 644, 'jo', 0, 0),
(822, 645, 'moin', 0, 0),
(823, 646, 'moin ', 0, 0),
(824, 646, 'jo', 0, 0),
(825, 647, 'moin', 0, 0),
(826, 648, 'moin ', 0, 0),
(827, 648, 'jo', 0, 0),
(828, 649, 'moin', 0, 0),
(829, 650, 'moin ', 0, 0),
(830, 650, 'jo', 0, 0),
(831, 651, 'moin', 0, 0),
(832, 652, 'moin ', 0, 0),
(833, 652, 'jo', 0, 0),
(834, 653, 'moin', 0, 0),
(835, 654, 'moin ', 0, 0),
(836, 654, 'jo', 0, 0),
(837, 655, 'moin', 0, 0),
(838, 656, 'moin ', 0, 0),
(839, 656, 'jo', 0, 0),
(840, 657, 'moin', 0, 0),
(841, 658, 'moin ', 0, 0),
(842, 658, 'jo', 0, 0),
(843, 659, 'moin', 0, 0),
(844, 660, 'moin ', 0, 0),
(845, 660, 'jo', 0, 0),
(846, 661, 'moin', 0, 0),
(847, 662, 'moin ', 0, 0),
(848, 662, 'jo', 0, 0),
(849, 663, 'moin', 0, 0),
(850, 664, 'moin ', 0, 0),
(851, 664, 'jo', 0, 0),
(852, 665, 'moin', 0, 0),
(853, 666, 'ich', 0, 0),
(854, 666, 'du', 0, 0),
(855, 666, 'er', 0, 0),
(856, 667, 'one', 0, 0),
(857, 668, 'two', 0, 0),
(858, 669, 'three', 0, 0),
(859, 670, 'four', 0, 0),
(860, 671, 'five', 0, 0),
(873, 680, 'moin ', 0, 0),
(874, 680, 'jo', 0, 0),
(875, 681, 'moin', 0, 0),
(876, 682, 'moin ', 0, 0),
(877, 682, 'jo', 0, 0),
(878, 683, 'moin', 0, 0),
(879, 684, 'moin ', 0, 0),
(880, 684, 'jo', 0, 0),
(881, 685, 'moin', 0, 0),
(882, 686, 'moin ', 0, 0),
(883, 686, 'jo', 0, 0),
(884, 687, 'moin', 0, 0),
(885, 688, 'moin ', 0, 0),
(886, 688, 'jo', 0, 0),
(887, 689, 'moin', 0, 0),
(888, 690, 'moin ', 0, 0),
(889, 690, 'jo', 0, 0),
(890, 691, 'moin', 0, 0),
(891, 692, 'moin ', 0, 0),
(892, 692, 'jo', 0, 0),
(893, 693, 'moin', 0, 0),
(894, 694, 'moin ', 0, 0),
(895, 694, 'jo', 0, 0),
(896, 695, 'moin', 0, 0),
(904, 696, 'one', 0, 0),
(905, 697, 'two', 0, 0),
(906, 698, 'three', 0, 0),
(907, 699, 'four', 0, 0),
(908, 700, 'five', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `child`
--

CREATE TABLE IF NOT EXISTS `child` (
`id` int(11) unsigned NOT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Persons`
--

CREATE TABLE IF NOT EXISTS `Persons` (
  `PersonID` int(11) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `test_table`
--

CREATE TABLE IF NOT EXISTS `test_table` (
`id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tree`
--

CREATE TABLE IF NOT EXISTS `tree` (
`list_id` bigint(20) unsigned NOT NULL,
  `parent_id` bigint(20) unsigned NOT NULL,
  `position` bigint(20) unsigned NOT NULL,
  `left` bigint(20) unsigned NOT NULL,
  `right` bigint(20) unsigned NOT NULL,
  `level` bigint(20) unsigned NOT NULL,
  `title` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=1614 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tree`
--

INSERT INTO `tree` (`list_id`, `parent_id`, `position`, `left`, `right`, `level`, `title`, `type`, `user_id`) VALUES
(1526, 1524, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 12),
(1527, 1526, 0, 5, 8, 2, 'Startordner', 'folder', 12),
(1528, 1527, 0, 6, 7, 3, 'Startliste', 'list', 12),
(1574, 0, 1, 1, 10, 0, 'Root', '', 33),
(1575, 1574, 0, 2, 3, 1, 'MeineGruppen', 'drive', 33),
(1576, 1574, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 33),
(1577, 1576, 0, 5, 8, 2, 'Startordner', 'folder', 33),
(1578, 1577, 0, 6, 7, 3, 'Startliste', 'list', 33),
(1525, 1524, 0, 2, 3, 1, 'MeineGruppen', 'drive', 12),
(1524, 0, 1, 1, 10, 0, 'Root', '', 12),
(1523, 1522, 0, 6, 7, 3, 'Startliste', 'list', 11),
(1522, 1521, 0, 5, 8, 2, 'Startordner', 'folder', 11),
(1521, 1519, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 11),
(1520, 1519, 0, 2, 3, 1, 'MeineGruppen', 'drive', 11),
(1518, 1517, 0, 6, 7, 3, 'Startliste', 'list', 10),
(1519, 0, 1, 1, 10, 0, 'Root', '', 11),
(1517, 1516, 0, 5, 8, 2, 'Startordner', 'folder', 10),
(1516, 1514, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 10),
(1504, 0, 1, 1, 10, 0, 'Root', '', 8),
(1505, 1504, 0, 2, 3, 1, 'MeineGruppen', 'drive', 8),
(1506, 1504, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 8),
(1507, 1506, 0, 5, 8, 2, 'Startordner', 'folder', 8),
(1508, 1507, 0, 6, 7, 3, 'Startliste', 'list', 8),
(1509, 0, 1, 1, 10, 0, 'Root', '', 9),
(1510, 1509, 0, 2, 3, 1, 'MeineGruppen', 'drive', 9),
(1511, 1509, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 9),
(1512, 1511, 0, 5, 8, 2, 'Startordner', 'folder', 9),
(1513, 1512, 0, 6, 7, 3, 'Startliste', 'list', 9),
(1514, 0, 1, 1, 10, 0, 'Root', '', 10),
(1515, 1514, 0, 2, 3, 1, 'MeineGruppen', 'drive', 10),
(1503, 1502, 0, 6, 7, 3, 'Startliste', 'list', 7),
(1493, 1487, 0, 7, 8, 4, 'moinmoin', 'folder', 2),
(1499, 0, 1, 1, 10, 0, 'Root', '', 7),
(1500, 1499, 0, 2, 3, 1, 'MeineGruppen', 'drive', 7),
(1501, 1499, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 7),
(1502, 1501, 0, 5, 8, 2, 'Startordner', 'folder', 7),
(1496, 1494, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 6),
(1498, 1497, 0, 6, 7, 3, 'Startliste', 'list', 6),
(1497, 1496, 0, 5, 8, 2, 'Startordner', 'folder', 6),
(1495, 1494, 0, 2, 3, 1, 'MeineGruppen', 'drive', 6),
(1494, 0, 1, 1, 10, 0, 'Root', '', 6),
(1487, 1486, 0, 6, 9, 3, 'Startliste', 'list', 2),
(1486, 1485, 0, 5, 10, 2, 'Startordner', 'folder', 2),
(1485, 1483, 1, 4, 11, 1, 'MeinLamapacos', 'drive', 2),
(1483, 0, 1, 1, 12, 0, 'Root', '', 2),
(1484, 1483, 0, 2, 3, 1, 'MeineGruppen', 'drive', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tree_data`
--

CREATE TABLE IF NOT EXISTS `tree_data` (
`id` int(10) unsigned NOT NULL,
  `nm` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8805 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tree_data`
--

INSERT INTO `tree_data` (`id`, `nm`, `type`) VALUES
(7, 'test_list', NULL),
(111, 'root', 'root'),
(112, 'PublicLists', 'public'),
(1111, 'root', 'root'),
(1112, 'MeineListen', 'mylama'),
(1113, 'Downloads', 'downloads'),
(1114, 'Startordner', 'folder'),
(8724, 'jo', 'folder'),
(8725, 'moin', 'list'),
(8726, 'moin', 'list'),
(8733, 'test_list', 'list');

-- --------------------------------------------------------

--
-- Table structure for table `tree_struct`
--

CREATE TABLE IF NOT EXISTS `tree_struct` (
`id` int(10) unsigned NOT NULL,
  `lft` int(10) unsigned NOT NULL,
  `rgt` int(10) unsigned NOT NULL,
  `lvl` int(10) unsigned NOT NULL,
  `pid` int(10) unsigned DEFAULT NULL,
  `pos` int(10) unsigned NOT NULL,
  `root_id` int(10) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8805 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tree_struct`
--

INSERT INTO `tree_struct` (`id`, `lft`, `rgt`, `lvl`, `pid`, `pos`, `root_id`) VALUES
(7, 0, 0, 0, NULL, 0, NULL),
(111, 1, 8, 0, 0, 0, 111),
(112, 2, 7, 1, 111, 0, 111),
(1111, 1, 12, 0, 0, 0, 1111),
(1112, 2, 11, 1, 1111, 0, 1111),
(1113, 3, 6, 2, 1112, 0, 1111),
(1114, 7, 10, 2, 1112, 1, 1111),
(8724, 3, 6, 2, 112, 0, 111),
(8725, 4, 5, 3, 8724, 0, 111),
(8726, 8, 9, 3, 1114, 0, 1111),
(8733, 4, 5, 3, 1113, 0, 1111);

-- --------------------------------------------------------

--
-- Table structure for table `vocs`
--

CREATE TABLE IF NOT EXISTS `vocs` (
`voc_id` int(11) unsigned NOT NULL,
  `list_id` int(11) DEFAULT NULL,
  `question` text
) ENGINE=InnoDB AUTO_INCREMENT=737 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vocs`
--

INSERT INTO `vocs` (`voc_id`, `list_id`, `question`) VALUES
(1, 1, NULL),
(2, NULL, NULL),
(10, 7, 'Pron'),
(11, 7, 'eins'),
(12, 7, 'zwei'),
(13, 7, 'drei'),
(14, 7, 'vier'),
(15, 7, 'fÃ¼nf'),
(290, 8049, 'moin2'),
(291, 8049, 'moin1'),
(450, 8375, 'moin2'),
(451, 8375, 'moin1'),
(452, 8376, 'moin2'),
(453, 8376, 'moin1'),
(461, 8390, 'moin2'),
(462, 8390, 'moin1'),
(498, 8456, 'moin2'),
(499, 8456, 'moin1'),
(500, 8463, 'Pron'),
(501, 8463, 'eins'),
(502, 8463, 'zwei'),
(503, 8463, 'drei'),
(504, 8463, 'vier'),
(505, 8463, 'fÃ¼nf'),
(507, 8476, 'Pron'),
(508, 8476, 'eins'),
(509, 8476, 'zwei'),
(510, 8476, 'drei'),
(511, 8476, 'vier'),
(512, 8476, 'fÃ¼nf'),
(514, 8489, 'Pron'),
(515, 8489, 'eins'),
(516, 8489, 'zwei'),
(517, 8489, 'drei'),
(518, 8489, 'vier'),
(519, 8489, 'fÃ¼nf'),
(521, 8502, 'Pron'),
(522, 8502, 'eins'),
(523, 8502, 'zwei'),
(524, 8502, 'drei'),
(525, 8502, 'vier'),
(526, 8502, 'fÃ¼nf'),
(528, 8515, 'Pron'),
(529, 8515, 'eins'),
(530, 8515, 'zwei'),
(531, 8515, 'drei'),
(532, 8515, 'vier'),
(533, 8515, 'fÃ¼nf'),
(535, 8528, 'Pron'),
(536, 8528, 'eins'),
(537, 8528, 'zwei'),
(538, 8528, 'drei'),
(539, 8528, 'vier'),
(540, 8528, 'fÃ¼nf'),
(542, 8541, 'Pron'),
(543, 8541, 'eins'),
(544, 8541, 'zwei'),
(545, 8541, 'drei'),
(546, 8541, 'vier'),
(547, 8541, 'fÃ¼nf'),
(556, 8567, 'Pron'),
(557, 8567, 'eins'),
(558, 8567, 'zwei'),
(559, 8567, 'drei'),
(560, 8567, 'vier'),
(561, 8567, 'fÃ¼nf'),
(563, 8580, 'Pron'),
(564, 8580, 'eins'),
(565, 8580, 'zwei'),
(566, 8580, 'drei'),
(567, 8580, 'vier'),
(568, 8580, 'fÃ¼nf'),
(570, 8593, 'Pron'),
(571, 8593, 'eins'),
(572, 8593, 'zwei'),
(573, 8593, 'drei'),
(574, 8593, 'vier'),
(575, 8593, 'fÃ¼nf'),
(577, 8606, 'Pron'),
(578, 8606, 'eins'),
(579, 8606, 'zwei'),
(580, 8606, 'drei'),
(581, 8606, 'vier'),
(582, 8606, 'fÃ¼nf'),
(584, 8619, 'Pron'),
(585, 8619, 'eins'),
(586, 8619, 'zwei'),
(587, 8619, 'drei'),
(588, 8619, 'vier'),
(589, 8619, 'fÃ¼nf'),
(605, 8652, 'moin2'),
(606, 8652, 'moin1'),
(607, 8653, 'moin2'),
(608, 8653, 'moin1'),
(609, 8654, 'moin2'),
(610, 8654, 'moin1'),
(611, 8655, 'moin2'),
(612, 8655, 'moin1'),
(613, 8656, 'moin2'),
(614, 8656, 'moin1'),
(615, 8657, 'moin2'),
(616, 8657, 'moin1'),
(617, 8658, 'moin2'),
(618, 8658, 'moin1'),
(619, 8659, 'moin2'),
(620, 8659, 'moin1'),
(621, 8660, 'moin2'),
(622, 8660, 'moin1'),
(623, 8661, 'moin2'),
(624, 8661, 'moin1'),
(625, 8662, 'moin2'),
(626, 8662, 'moin1'),
(627, 8663, 'ja'),
(628, 8664, 'ja'),
(629, 8665, 'moin'),
(630, 8668, 'jo'),
(631, 8668, 'moin'),
(632, 8669, 'jo'),
(633, 8669, 'moin'),
(634, 8670, 'jo'),
(635, 8670, 'moin'),
(636, 8675, 'moin'),
(637, 8675, 'moin'),
(638, 8676, 'moin'),
(639, 8676, 'moin'),
(640, 8677, 'moin'),
(641, 8677, 'moin'),
(642, 8678, 'moin'),
(643, 8678, 'moin'),
(644, 8679, 'moin'),
(645, 8679, 'moin'),
(646, 8680, 'moin'),
(647, 8680, 'moin'),
(648, 8681, 'moin'),
(649, 8681, 'moin'),
(650, 8682, 'moin'),
(651, 8682, 'moin'),
(652, 8683, 'moin'),
(653, 8683, 'moin'),
(654, 8684, 'moin'),
(655, 8684, 'moin'),
(656, 8685, 'moin'),
(657, 8685, 'moin'),
(658, 8686, 'moin'),
(659, 8686, 'moin'),
(660, 8687, 'moin'),
(661, 8687, 'moin'),
(662, 8688, 'moin'),
(663, 8688, 'moin'),
(664, 8689, 'moin'),
(665, 8689, 'moin'),
(666, 8696, 'Pron'),
(667, 8696, 'eins'),
(668, 8696, 'zwei'),
(669, 8696, 'drei'),
(670, 8696, 'vier'),
(671, 8696, 'fÃ¼nf'),
(680, 8716, 'moin'),
(681, 8716, 'moin'),
(682, 8717, 'moin'),
(683, 8717, 'moin'),
(684, 8718, 'moin'),
(685, 8718, 'moin'),
(686, 8719, 'moin'),
(687, 8719, 'moin'),
(688, 8720, 'moin'),
(689, 8720, 'moin'),
(690, 8721, 'moin'),
(691, 8721, 'moin'),
(692, 8722, 'moin'),
(693, 8722, 'moin'),
(694, 8723, 'moin'),
(695, 8723, 'moin'),
(696, 8733, 'eins'),
(697, 8733, 'zwei'),
(698, 8733, 'drei'),
(699, 8733, 'vier'),
(700, 8733, 'fÃ¼nf');

-- --------------------------------------------------------

--
-- Table structure for table `vocs_copy`
--

CREATE TABLE IF NOT EXISTS `vocs_copy` (
`voc_id` int(11) unsigned NOT NULL,
  `list_id` int(11) DEFAULT NULL,
  `question` text
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vocs_copy`
--

INSERT INTO `vocs_copy` (`voc_id`, `list_id`, `question`) VALUES
(1, 5, NULL),
(2, 5, NULL),
(3, 5, NULL),
(4, 5, NULL),
(5, 5, NULL),
(6, 5, NULL),
(7, 5, NULL),
(8, 5, NULL),
(9, 5, NULL),
(10, 5, NULL),
(11, 5, NULL),
(12, 5, NULL),
(13, 5, NULL),
(14, 5, NULL),
(15, 5, NULL),
(16, 5, NULL),
(17, 5, NULL),
(18, 5, NULL),
(19, 5, NULL),
(20, 5, NULL),
(21, 5, NULL),
(22, 5, NULL),
(23, 5, NULL),
(24, 5, NULL),
(28, 5, NULL),
(29, 5, NULL),
(30, 5, NULL),
(31, 5, NULL),
(32, 5, NULL),
(33, 5, NULL),
(34, 5, NULL),
(35, 5, NULL),
(36, 5, NULL),
(37, 5, NULL),
(38, 5, NULL),
(39, 5, NULL),
(40, 5, NULL),
(41, 5, NULL),
(42, 5, NULL),
(43, 5, NULL),
(44, 5, NULL),
(45, 5, NULL),
(46, 5, NULL),
(47, 5, NULL),
(48, 5, NULL),
(49, 5, NULL),
(50, 5, NULL),
(51, 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `voc_user_data`
--

CREATE TABLE IF NOT EXISTS `voc_user_data` (
`answer_id` int(11) unsigned NOT NULL,
  `user_id` int(20) DEFAULT NULL,
  `right` int(11) unsigned DEFAULT '0',
  `wrong` int(11) unsigned DEFAULT '0',
  `rating` float DEFAULT '-1',
  `last_access` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COMMENT='multiple_answers';

--
-- Dumping data for table `voc_user_data`
--

INSERT INTO `voc_user_data` (`answer_id`, `user_id`, `right`, `wrong`, `rating`, `last_access`) VALUES
(1, 111, 1, 0, 0, '2015-04-27 15:23:20'),
(2, 111, 1, 0, 0, '2015-04-27 15:23:20'),
(7, 111, 0, 0, -1, '2015-04-27 15:23:20'),
(8, 111, 0, 0, -1, '2015-04-27 15:23:20'),
(9, 111, 0, 0, -1, '2015-04-27 15:23:20'),
(10, 111, 0, 0, -1, '2015-04-27 15:23:20'),
(11, 111, 0, 0, -1, '2015-04-27 15:23:20'),
(12, 111, 0, 0, -1, '2015-04-27 15:23:20'),
(13, 111, 0, 0, -1, '2015-04-27 15:23:20'),
(14, 111, 0, 0, 3, '2015-04-27 15:23:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
 ADD PRIMARY KEY (`user_id`), ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indexes for table `answer_table`
--
ALTER TABLE `answer_table`
 ADD PRIMARY KEY (`answer_id`), ADD KEY `voc_id` (`voc_id`);

--
-- Indexes for table `child`
--
ALTER TABLE `child`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_table`
--
ALTER TABLE `test_table`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tree`
--
ALTER TABLE `tree`
 ADD PRIMARY KEY (`list_id`);

--
-- Indexes for table `tree_data`
--
ALTER TABLE `tree_data`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tree_struct`
--
ALTER TABLE `tree_struct`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vocs`
--
ALTER TABLE `vocs`
 ADD PRIMARY KEY (`voc_id`);

--
-- Indexes for table `vocs_copy`
--
ALTER TABLE `vocs_copy`
 ADD PRIMARY KEY (`voc_id`);

--
-- Indexes for table `voc_user_data`
--
ALTER TABLE `voc_user_data`
 ADD PRIMARY KEY (`answer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
MODIFY `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=257;
--
-- AUTO_INCREMENT for table `answer_table`
--
ALTER TABLE `answer_table`
MODIFY `answer_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=961;
--
-- AUTO_INCREMENT for table `child`
--
ALTER TABLE `child`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `test_table`
--
ALTER TABLE `test_table`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tree`
--
ALTER TABLE `tree`
MODIFY `list_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1614;
--
-- AUTO_INCREMENT for table `tree_data`
--
ALTER TABLE `tree_data`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8805;
--
-- AUTO_INCREMENT for table `tree_struct`
--
ALTER TABLE `tree_struct`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8805;
--
-- AUTO_INCREMENT for table `vocs`
--
ALTER TABLE `vocs`
MODIFY `voc_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=737;
--
-- AUTO_INCREMENT for table `vocs_copy`
--
ALTER TABLE `vocs_copy`
MODIFY `voc_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `voc_user_data`
--
ALTER TABLE `voc_user_data`
MODIFY `answer_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer_table`
--
ALTER TABLE `answer_table`
ADD CONSTRAINT `answer_table_ibfk_1` FOREIGN KEY (`voc_id`) REFERENCES `vocs` (`voc_id`) ON DELETE CASCADE;

--
-- Constraints for table `tree_data`
--
ALTER TABLE `tree_data`
ADD CONSTRAINT `tree_data_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tree_struct` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `voc_user_data`
--
ALTER TABLE `voc_user_data`
ADD CONSTRAINT `voc_user_data_ibfk_1` FOREIGN KEY (`answer_id`) REFERENCES `answer_table` (`answer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
